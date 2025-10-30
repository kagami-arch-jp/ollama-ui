
export default function buildChatPatch(model) {
  const patch={
    isEnd: false,
    text: x=>[false, x],
  }

  if(model.indexOf('gemma')>-1) {
    patch.text=x=>{
      const [isEnd, text]=patchGemmaModelResponse(x)
      patch.isEnd=isEnd
      return [isEnd, text]
    }
  }

  return patch
}

function patchGemmaModelResponse(text) {
  const flags=[
    '</end_of_turn>',
    '<end_of_turn>',
    '</start_of_turn>',
    '<start_of_turn>',
  ]
  for(let d of flags) {
    const i=text.indexOf(d)
    if(i===-1) continue
    return [true, text.substr(0, i)]
  }
  return [false, text]
}

