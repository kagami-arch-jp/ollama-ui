<?js
const {callOllamaApi}=include('../../server/ollama.s')

async function getLLMLog(query) {
  const ret={
    log: ''
  }
  let thinking_end=null
  await callOllamaApi('chat', {
    query,
    onData: (err, isEnd, part) => {
      if (err) {
        console.log({ err: err.message });
      } else if (part) {
        const { content, thinking } = part.message;
        if(content) ret.log+=content
        if(thinking) {
          if(thinking_end===null) {
            thinking_end=false
            console.log('Thinking:')
          }
        }else{
          if(thinking_end===false) {
            thinking_end=true
            console.log("\n")
          }
        }
        process.stdout.write(content || thinking || '')
      }
    },
  })
  return ret
}

; (async _=>{

  if($_QUERY.a==='gitcommit') {
    const commit=await new Promise(resolve=>{
      let commitStr=''
      process.stdin.on('data', c=>{
        commitStr+=c.toString()
      }).on('end', _=>resolve(commitStr))
    })
    if(!commit) {
      return
    }
    console.log("please wait..\n")
    const ret=await getLLMLog({
      stream: true,
      model: 'gemma3n:e4b-it-fp16',
      messages: [
        {
          role: 'user',
          content: `
          You are a professional architect. The user needs you to summarize the git commit history and generate commit messages based on the code changes.
          The commit messages you generate must adhere to the following specifications:

          1. Please compare the functionality of the code in the file before and after the changes, consider the purpose of the changes, and then output the purpose of the changes as the key point of the modification as simply as possible.
          2. If multiple changes are related, please consider the actual purpose of these changes, and then output only that purpose as a change point.
          3. Please answer in **English** and only output the main functional changes.
          4. Please output in the following format, format as:
          [Type]: [Title]
          - [change info]
          - [change info]
          - ...
          Please replace \`[Type]\`, \`[Title]\`, and \`[change info]\` with the actual results.
          The result you generate should have only one title, but can have multiple change points.
          5. Please **only output** the commit message content, do not include any markdown formatting.
          6. Please only count the code changes for this commit.
          Lines starting with \`-\` indicate that this code was deleted in this commit.
          Lines starting with \`+\` indicate that this code was added in this commit.

          The following is the code changes counted using the \`git diff --cached\` command:
          `.split('\n').map(x=>x.trim()).join('\n')+
          "\n\n```git\n"+commit.replace(/```/g, '\\`\\`\\`')+"\n```"
        },
      ],
      options: { temperature: 0, num_ctx: 32768 },
    })

    const fs=require('fs')
    fs.writeFileSync(process.cwd()+'/gitcommit.txt', ret.log)

    console.log("\n\ngit commit message added.\n\n")
  }

})()
