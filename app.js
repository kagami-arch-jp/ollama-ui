const _require=require; require=_=>{};
require("./ollama.s"); require("./index.s"); require("./dist/index.html");

require=_require;

process.argv.push(
  '-p'+(process.env.PORT || 3000),
  '-rindex.s',
)
require('sptc/bin/sptcd')
