const fs=require('fs')

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

const ls=[]
for(const r of ['./server', './dist', './node_modules']) {
  walk(r, fn=>{
    if(!fn.match(/\.(html|css|js|s|json|cjs|mjs)$/)) return;
    ls.push(r+fn)
  })
}

// console.log(ls)
const appCode=fs.readFileSync('./app.js', 'utf8')
fs.writeFileSync('./app.js', appCode.replace(/(\/\/ lock-begin)[\s\S]+(\/\/ lock-end)/, '$1\n'+ls.map(x=>`require('${x}');`).join('\n')+'\n$2'))
