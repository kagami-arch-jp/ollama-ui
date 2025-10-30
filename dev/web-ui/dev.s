<?js

const PACK=true

const DEV_ROOT=__dirname+'/..'
const APP_ROOT=DEV_ROOT+'/..'
const SERVER_ROOT=APP_ROOT+'/server'

const {App: OllamaApiRoute}=include(SERVER_ROOT+'/ollama.s')

// ------------------------------------------------------------
// グローバル定数（名前は変更不可）
// ------------------------------------------------------------
const PUBLIC_DIR = __dirname + '/public';
const SRC_DIR = PUBLIC_DIR + '/src';

const {MODULE_ALIAS, CDN_FILES}=include(__dirname+'/config.s')

// 拡張子探索リスト（名前は変更不可）
const resolvePathSyncExts = ['/index.jsx', '/index.js', '.jsx', '.js', ''];

// ------------------------------------------------------------
// ファイル解決ユーティリティ
// ------------------------------------------------------------
function resolvePathSync(requestPath) {
  const fs = require('fs');
  const path = require('path');

  // 先頭スラッシュを統一し、正規化
  const normalized = path.normalize('/' + requestPath);

  for (const ext of resolvePathSyncExts) {
    const candidate = normalized + ext;                     // 試行パス
    const absolute = path.join(PUBLIC_DIR, candidate);    // 実際のフルパス

    if (fs.existsSync(absolute)) {
      return {
        filename: candidate,   // PUBLIC_DIR からの相対パス
        fullfilename: absolute // 絶対パス
      };
    }
  }

  return null
}

// ------------------------------------------------------------
// JSX → JavaScript 変換（Babel）
// ------------------------------------------------------------
function transformJSX(fileInfo, sourceCode, esm=false) {
  const Babel = require('@babel/standalone');

  // Babel の変換オプション
  const transformOptions = {
    filename: fileInfo.filename,
    presets: ['react', esm && 'env'].filter(Boolean),
    plugins: [{
      visitor: {
        // import 文を書き換える
        ImportDeclaration(pathNode, state) {
          const importSource = pathNode.node.source;

          // 相対/絶対パスを解決
          const resolved = resolvePathSync(
            importSource.value.startsWith('/')
              ? '/src/' + importSource.value
              : state.filename + '/../' + importSource.value
          )?.filename;

          if(!resolved) return;

          // .less/.jsx/.js だけ書き換える
          if (/\.(less|jsx?)$/.test(resolved)) {
            importSource.value = resolved;
          }
        }
      }
    }]
  };

  const { code: transformedCode } = Babel.transform(sourceCode, transformOptions);
  return transformedCode;
}

// ------------------------------------------------------------
// __view_scope プレースホルダー置換
// ------------------------------------------------------------
function replaceViewScope(filePath, sourceCode) {
  // ファイルパスを安全な識別子に変換（例: /src/app.jsx → _src_app_jsx）
  const safeName = filePath.replace(/(\/|\\)+|\b[^\\\/]+$/g, '_');
  return sourceCode.replace(/\b__view_scope\b/g, safeName);
}

// ------------------------------------------------------------
// LESS → CSS 変換
// ------------------------------------------------------------
async function transformLess(fileInfo, sourceCode, returnCSS) {
  const less = require('less');

  let { css } = await less.render(sourceCode, {
    rewriteUrls: 'all',
    rootpath: fileInfo.filename + '/..',
  });

  css=css.replace(/([\d.]*)px/g, (_, n)=>{
    return n*.06+'rem'
  })

  if(returnCSS) return css

  // CSS をインジェクトするユーティリティ関数にラップ
  return `injectCSS(${JSON.stringify(css)})`;
}

function isFileChanged(file, x='') {
  const key=`${x}-RESOURCES_CACHE`
  Application[key]=Application[key] || {}
  const fs=require('fs')
  const cache=Application[key]
  const mtime=fs.statSync(file).mtime
  if(cache[file]?.mtime-mtime!==0) {
    cache[file]={mtime}
    return true
  }
  return false
}

async function loadCache(file, reader) {
  const isFileArray=Array.isArray(file)
  if(!isFileArray) file=[file]
  Application.LOAD_CACHE=Application.LOAD_CACHE || {}
  const cache=Application.LOAD_CACHE
  let updated=false
  for(let fi of file) {
    if(isFileChanged(fi, isFileArray? 'arr': 'file')) updated=true
  }
  const key=isFileArray? '\n'+file.join('\n'): file
  if(updated) {
    cache[key]=await reader()
  }
  echo(cache[key])
}

function walk(dir, cb) {
  const fs=require('fs')
  const path=require('path')
  const dirs=[dir]
  for(;dirs.length;) {
    const _dir=dirs.shift()
    for(const fn of fs.readdirSync(_dir)) {
      if(fn=='.' || fn=='..') continue
      const fullfn=_dir+'/'+fn
      if(fs.statSync(fullfn).isFile()) {
        cb(fullfn.substr(dir.length))
      }else{
        dirs.push(fullfn)
      }
    }
  }
}

function pack(entryFile='/src/App.jsx') {

  const fileInfos=[]
  walk(PUBLIC_DIR, x=>{
    if(!x.match(/\.(jsx?|less)$/)) return;
    const fileInfo=resolvePathSync(x);
    if(!fileInfo) return;
    fileInfos.push(fileInfo)
  })

  return [fileInfos.map(x=>x.fullfilename), async _=>{
    const fs=require('fs')
    const jsModules=[]
    const cssModules=[]
    for(const fileInfo of fileInfos) {
      const file=fileInfo.fullfilename
      const ext = Utils.getExtension(file);
      const rawCode = fs.readFileSync(file, 'utf8');
      const scopedCode = replaceViewScope(fileInfo.filename, rawCode);

      if (['.jsx', '.js'].includes(ext)) {
        jsModules.push([fileInfo, transformJSX(fileInfo, scopedCode, true)])
      } else if(['.less'].includes(ext)) {
        cssModules.push(transformLess(fileInfo, scopedCode))
      }
    }

    /*
    (function() {
    var exports={}
    var modules={
      '/src/App.jsx': function(require, exports) {

        ...
      },
    }
    function require(x) {
      if(modules[x]) {
        if(!exports[x]) {
          const exp={}
          modules[x](require, exp)
          exports[x]={result: exp}
        }
        return exports[x].result
      }
      return window[x]
    }
    modules[entryFile](require)
    })()
    */

    return `(function() {
      const map=${JSON.stringify(MODULE_ALIAS)}
      const exports={}
      const modules={
      `+
      (_=>{
        let rets=[]
        for(let [fileInfo, jscode] of jsModules) {
          rets.push(`'${fileInfo.filename}': function(require, exports) {${jscode}}`)
        }
        return rets.join(',\n')
      })()
      +`
    }
    function injectCSS(code) {
      const newStyle=document.createElement('style')
      newStyle.textContent=code
      document.head.appendChild(newStyle)
    }
    function require(x) {
      if(modules[x]) {
        if(!exports[x]) {
          const exp={}
          exports[x]={result: exp}
          modules[x](require, exp)
        }
        return exports[x].result
      }
      return window[x] || window[map[x]]
    }
    ${(await Promise.all(cssModules)).join('\n')}
    ; modules['${entryFile}'](require)
    })()`

  }]

}

// ------------------------------------------------------------
// ルーティングクラス（名前は変更不可）
// ------------------------------------------------------------
class AppRoute extends OllamaApiRoute{
  // /src/ で始まるリクエストは /asset にリライト
  static rewrite() {
    if ($_PATHNAME.indexOf('/src/') === 0) {
      $_QUERY = { ...$_QUERY, file: '.' + $_PATHNAME };
      $_PATHNAME = '/asset';
    }
  }

  async bundleAction() {
    setResponseHeaders({
      'content-type': 'text/javascript; charset=utf8',
      'cache-Control': 'no-cache, no-store, must-revalidate',
      pragma: 'no-cache',
      expires: 0,
    });

    const [files, bundleFunc]=pack()
    await loadCache(files, bundleFunc)
  }

  // 無視すべきパスか判定
  static isIgnorePath() {
    const ignoreList = ['com.chrome.devtools.json', '/favicon.ico'];
    return ignoreList.some(ig => $_PATHNAME.includes(ig));
  }

  static getActionName() {
    return ($_QUERY.action || $_PATHNAME.substr(1) || 'index') + 'Action';
  }

  // エントリポイント
  static async run() {
    if (this.isIgnorePath()) return;

    this.rewrite();

    const router = new this;
    const actionName = this.getActionName()
    const result = { success: true, result: null, error: null };

    try {
      const actionResult = await router[actionName]();
      if (actionResult === undefined) return;
      result.result = actionResult;
    } catch (err) {
      console.log({ $_PATHNAME, $_QUERY, error: err });
      result.success = false;
      result.error = err.message;
    }

    setStatus(200);
    setResponseHeaders({ 'content-type': 'text/json' });
    echo(JSON.stringify(result));
  }

  // ----------------------------------------------------------
  // 各アクション
  // ----------------------------------------------------------

  // index → 静的 HTML を返す
  async indexAction() {
    include(PUBLIC_DIR + '/index.shtml', {
      PACK,
      MODULE_ALIAS,
      CDN_FILES,
    });
  }

  async buildAction() {
    console.log('pack files..')
    readEchoed()
    include(PUBLIC_DIR + '/index.shtml', {
      BUILD: true,
      MODULE_ALIAS,
      CDN_FILES,
    });
    const outHTML=readEchoed()
    const [files, bundleFunc]=pack()
    const jsCode=await bundleFunc()
    const fs=require('fs')
    const DIST_DIR=APP_ROOT+'/dist'
    try{
      fs.mkdirSync(DIST_DIR)
    }catch(e) {}
    fs.writeFileSync(DIST_DIR+'/index.html', outHTML)
    fs.writeFileSync(DIST_DIR+'/bundle.js', jsCode)
    console.log('done')
  }

  // asset → JS / JSX / LESS / 画像等の配信
  async assetAction() {
    const path = require('path');
    const fs = require('fs');

    const requestedPath = path.normalize('/' + $_QUERY.file);
    const ext = Utils.getExtension(requestedPath);

    // JS / JSX / LESS はオンザフライで変換
    if (['.jsx', '.js', '.less'].includes(ext)) {
      setResponseHeaders({
        'content-type': 'text/javascript; charset=utf8',
        'cache-Control': 'no-cache, no-store, must-revalidate',
        pragma: 'no-cache',
        expires: 0,
      });

      const fileInfo = resolvePathSync(requestedPath);
      if(!fileInfo) return;

      const file=fileInfo.fullfilename
      await loadCache(file, async _=>{
        const rawCode = fs.readFileSync(file, 'utf8');
        const scopedCode = replaceViewScope(requestedPath, rawCode);

        if (['.jsx', '.js'].includes(ext)) {
          return transformJSX(fileInfo, scopedCode)
        } else {
          // .less
          return await transformLess(fileInfo, scopedCode)
        }
      })

      return;
    }

    // それ以外はそのままファイル送信
    sendFile(path.join(PUBLIC_DIR, requestedPath));
  }

}

Sync.Push(AppRoute.run());
