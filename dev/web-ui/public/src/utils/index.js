import {store} from '/store'

export function cls(...c) {
  return c.filter(Boolean).join(' ')
}

let sessid=0
const key_prefix=(Date.now()+Math.random()).toString(36).replace(/\./g, '-')+'-'
export function newUUID() {
  return key_prefix+'-'+(sessid++).toString(36)
}

export function formatTime() {
  const a=new Date
  return a.toLocaleString()
}

export function isWideScreen() {
  return innerWidth>innerHeight*1.1
}

export function isLocalServer() {
  return location.href.indexOf('127.0.0.1')>-1
}

export async function callApi(action, opt) {
  const {postData, onData}=opt || {}
  const {enable, value}=store.apiKey.getValue()
  const option={
    headers: {
      'x-ollama-apikey': enable && value || '',
    },
  }
  if(postData) {
    Object.assign(option, {
      method: 'POST',
      body: postData,
    })
  }
  const req=fetch('/'+action, option)
  if(onData) {
    try{
      const response=await req
      const reader = response.body.getReader()
      const dec=new TextDecoder
      for(;;) {
        const {done, value}=await reader.read()
        if(value) {
          dec.decode(value).split('\n').map(val=>{
            try{
              if(JSON.parse(val)) onData(null, done, val)
            }catch(e) {}
          })
        }else{
          onData(null, done, null)
        }
        if(done) break
      }
    }catch(e) {
      onData(e)
    }
  }else{
    return (await req).json()
  }
}

export function markdown(str) {
  const _marked=new marked.Marked
  _marked.use({renderer: {
    html: x=>{
      return x.raw.replace(/<br\s*>/g, '\n')
        .replace(/<\/?|</g, _=>{
          if(_==='<') return '&lt;'
        })
        .replace(/\n/g, '<br />')
    },
    code: e=>{
      return `<pre><code class="hljs language-${e.lang || 'markdown'}">${
        hljs.highlight(e.text.trim(), { language: e.lang || 'plaintext' }).value
      }</code></pre>`
    },
  }})
  // fix marked parse bug
  str=str.replace(/(\*\*[^*]+\*\*)([\S])/g, `$1 $2`)
  return _marked.parse(str, {
    mangle: false,
    headerIds: false,
    silent: true,
  })
}

window.M=markdown

export async function loadScript(src, isModule, jscode) {
  return new Promise((resolve, reject)=>{
    const s=document.createElement('script')
    if(src) s.src=resolvePath(src)
    else if(jscode) s.innerHTML=jscode
    s.type=isModule? 'module': 'text/javascript'
    s.onload=_=>resolve()
    s.onerror=_=>reject()
    document.body.appendChild(s)
  })
}

export function loadCss(src) {
  const e=document.createElement('link')
  e.rel='stylesheet'
  e.href=resolvePath(src)
  e.type='text/css'
  document.body.appendChild(e)
}

export function throttle(fn, interval) {
  let t=0, e=0
  const _fn=(...x)=>{
    clearTimeout(e)
    const _t=Date.now()
    if(_t-t<interval) {
      e=setTimeout(_=>_fn(...x), interval)
      return
    }
    fn(...x)
    t=_t
  }
  return _fn
}
