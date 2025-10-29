const _require=require; require=_=>{};
// lock-begin
require('./code/index.s');
require('./code/ollama.s');
require('./dist/bundle.js');
require('./dist/index.html');
require('./node_modules/commander/esm.mjs');
require('./node_modules/commander/index.js');
require('./node_modules/commander/package-support.json');
require('./node_modules/commander/package.json');
require('./node_modules/ollama/package.json');
require('./node_modules/sptc/package.json');
require('./node_modules/whatwg-fetch/fetch.js');
require('./node_modules/whatwg-fetch/package.json');
require('./node_modules/commander/lib/argument.js');
require('./node_modules/commander/lib/command.js');
require('./node_modules/commander/lib/error.js');
require('./node_modules/commander/lib/help.js');
require('./node_modules/commander/lib/option.js');
require('./node_modules/commander/lib/suggestSimilar.js');
require('./node_modules/ollama/dist/browser.cjs');
require('./node_modules/ollama/dist/browser.mjs');
require('./node_modules/ollama/dist/index.cjs');
require('./node_modules/ollama/dist/index.mjs');
require('./node_modules/sptc/bin/sptc.js');
require('./node_modules/sptc/bin/sptcd.js');
require('./node_modules/sptc/dist/httpServer.js');
require('./node_modules/sptc/dist/webpack.loader.js');
require('./node_modules/sptc/engine/compiler-macro.js');
require('./node_modules/sptc/engine/compiler.js');
require('./node_modules/sptc/engine/index.js');
require('./node_modules/sptc/engine/interpreter-macro.js');
require('./node_modules/sptc/engine/interpreter.js');
require('./node_modules/sptc/utils/base.js');
require('./node_modules/sptc/utils/compileFile.js');
require('./node_modules/sptc/utils/dir.js');
require('./node_modules/sptc/utils/format.js');
require('./node_modules/sptc/utils/fpm.js');
require('./node_modules/sptc/utils/index.js');
require('./node_modules/sptc/utils/info.js');
require('./node_modules/whatwg-fetch/dist/fetch.umd.js');
require('./node_modules/sptc/tests/ctx/1.js');
require('./node_modules/sptc/tests/ctx/a.js');
require('./node_modules/sptc/tests/ctx/a.s');
require('./node_modules/sptc/tests/engine/m1.js');
require('./node_modules/sptc/tests/engine/test-macro.js');
require('./node_modules/sptc/tests/engine/test.js');
require('./node_modules/sptc/tests/inc_js/1.s');
require('./node_modules/sptc/tests/inc_js/a.js');
require('./node_modules/sptc/tests/test1/exp.s');
require('./node_modules/sptc/tests/www/cc.s');
require('./node_modules/sptc/tests/www/dd.s');
require('./node_modules/sptc/tests/www/eee.s');
require('./node_modules/sptc/tests/www/index.s');
require('./node_modules/sptc/tests/www/stream.s');
// lock-end
require=_require;


process.argv.push(
  '-p'+(process.env.PORT || 3000),
  '-wcode',
  '-rindex.s',
)
require('sptc/bin/sptcd')

/*
require('http').createServer((req, res)=>{
  const {pathname}=require('url').parse(req.url)
  const fs=require('fs')
  try{
    res.end(fs.readdirSync(__dirname+pathname).join('\n'))
  }catch(e) {
    res.end('500')
  }
}).listen(process.env.PORT || 3000)
*/
