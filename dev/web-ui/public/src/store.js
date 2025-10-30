import React from 'react'
import createSharedState from 'react-cross-component-state'
import {newUUID, formatTime, markdown, throttle} from '/utils'
import buildChatPatch from '/utils/patch'
import * as api from '/api'

export const store={
  activeTabIdx: createSharedState(0),

  apiKey: createSharedState(_=>({
    enable: false,
    value: '',
  })),
  prompt: createSharedState(_=>({
    enable: false,
    value: '',
  })),
  customPrompt: createSharedState(_=>({
    enable: false,
    list: [{title: 'Untitled', content: ''}],
    idx: 0,
  })),
  model: createSharedState(_=>({
    names: [],
    idx: null,
    selects: {},
    byApikey: '',
    isLoading: true,
    isError: false,
  })),
  temperature: createSharedState(0),
  contextLength: createSharedState(8*1024),

  messages: createSharedState(_=>({
    list: [],
    isResponsing: false,
  })),
  messageHistory: createSharedState(_=>([])),

  sendWithHistory: createSharedState(false),
  enterSend: createSharedState(true),
  multiLineInput: createSharedState(false),

  inputValue: createSharedState(''),

  dialogData: createSharedState({
    show: false,
    title: null,
    content: null,
  }),

}

export async function initStore() {
  api.resetOllamaClient()
  api.loadConfig()
  api.loadMessages()
  loadModels()
}

export function getModelName() {
  const model=store.model.getValue()
  return model.names[model.idx]
}

export function exportSetting() {
  const apiKey=store.apiKey.getValue()
  const prompt=store.prompt.getValue()
  const contextLength=store.contextLength.getValue()
  const temperature=store.temperature.getValue()
  const model=store.model.getValue()
  const customPrompt=store.customPrompt.getValue()
  const ret={
    prompt,
    customPrompt,
  }

  const _url=URL.createObjectURL(new Blob([encodeURIComponent(JSON.stringify(ret))], {type: 'text/plain'}))

  const a=document.body.appendChild(document.createElement('a'))
  a.href=_url
  a.download='setting.txt'
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(_url)
}

export function importSetting() {
  const inp=document.createElement('input')
  inp.type='file'
  inp.accept='.txt'
  inp.className='hidden-btn'
  inp.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const s=JSON.parse(decodeURIComponent(await file.text()))
        for(const k in s) {
          store[k]?.setValue(s[k])
        }
        inp.remove();
        alert('import config successful!')
      }catch(e) {
        console.log(e)
        alert('failed to load config: '+e.message)
      }
    }
  })
  inp.click()
  document.body.appendChild(inp)
}

export function getApikey(returnFragment) {
  const apiKey=store.apiKey.getValue()
  const e=apiKey.enable && apiKey.value
  if(!e) return ''
  if(returnFragment) return e.substr(10, 8)
  return e
}

function newMsg(content) {
  const isQuestion=content? true: false
  return {
    key: newUUID(),
    isQuestion: isQuestion || false,
    text: isQuestion? content: '',
    user: isQuestion? 'anonymous': '',
    thinking: '',
    html: '',
    model: isQuestion? '': getModelName(),
    time: formatTime(),
    isPending: isQuestion? false: true,
    isError: false,
    isActive: false,
  }
}
export function ask(question, answer) {

  const messages=store.messages.getValue()
  messages.isResponsing=true

  const ans=answer || newMsg()

  if(!answer) {
    const msg=newMsg(question)
    messages.list.push(msg, ans)
    setTimeout(_=>{
      msg.isActive=true
      store.messages.setValue({
        ...messages,
      })
    }, 100)
  }

  setTimeout(_=>{
    ans.isActive=true
    store.messages.setValue({
      ...messages,
    })
  }, 200)

  const patch=buildChatPatch(getModelName())

  const update=throttle((err, isEnd)=>{
    ans.html=markdown((ans.thinking? `<think>${ans.thinking}</think>\n`: '')+ans.text)
    if(err || isEnd) {
      api.resetOllamaClient()
      ans.isPending=false
      messages.isResponsing=false
    }

    store.messages.setValue({
      ...messages,
    })
  }, 200)

  api.chat((e, isEnd, ret)=>{
    if(patch.isEnd) return;

    const {content, thinking}=JSON.parse(ret || '{}')

    if(content) ans.text+=content
    else if(thinking) ans.thinking+=thinking

    const err=e || (isEnd && !ans.text? new Error('Unknown error'): null)
    if(err) {
      ans.text+='\n### '+err.message
      ans.isError=true
    }else if(content) {
      const [realEnd, text]=patch.text(ans.text)
      if(realEnd) {
        isEnd=true
        ans.text=text
      }
    }

    update(err, isEnd)
  })
}

export async function loadModels() {
  const model={
    ...store.model.getValue(),
    isLoading: true,
    isError: false,
    byApikey: getApikey(true),
  }
  store.model.setValue(model)
  const mod=await api.getModels()
  const arr=mod?.result
  if(!Array.isArray(arr)) {
    store.model.setValue({
      ...model,
      isLoading: false,
      isError: true,
      names: [],
      idx: -1,
    })
    return
  }
  model.selects=model.selects || {}
  const name=model.selects[model.byApikey] || model.names[model.idx]
  const idx=arr.findIndex(x=>x===name)
  model.selects[model.byApikey]=name
  store.model.setValue({
    ...model,
    names: arr,
    idx: idx<0? 0: idx,
    isLoading: false,
    isError: false,
  })
}

export function selectModel(idx) {
  const model=store.model.getValue()
  model.idx=idx
  model.selects[model.byApikey]=model.names[idx]
  store.model.setValue({...model})
}

export function getPresetPrompt(returnRealtime) {
  const now=(new Date).toLocaleString()
  const day='日月火水木金土'.charAt((new Date).getDay())+'曜日'
  const systemPrompt=store.prompt.getValue()
  const customPrompt=store.customPrompt.getValue()
  return [
    returnRealtime && `今は「${now}」です。今日は「${day}」です。`,
    systemPrompt.enable && systemPrompt.value,
    customPrompt.enable && customPrompt.list[customPrompt.idx].content,
  ].filter(Boolean).join('\n')
}

export function newChat() {
  const messages=store.messages.getValue()
  const messageHistory=store.messageHistory.getValue()
  store.messageHistory.setValue([...messageHistory, {
    messages: messages.list,
    sendWithHistory: store.sendWithHistory.getValue(),
    enterSend: store.enterSend.getValue(),
    multiLineInput: store.multiLineInput.getValue(),
  }])
  store.messages.setValue({
    ...messages,
    list: [],
    isResponsing: false,
  })
  api.saveMessages()
}

export function deleteMessage(i) {
  const messages=store.messages.getValue()
  messages.list.splice(i, 1)
  store.messages.setValue({...messages})
  api.saveMessages()
}

export function useHistoryCount() {
  const messageHistory=store.messageHistory.useValue()
  return messageHistory.reduce((n, h)=>{
    return n+h.messages.length
  }, 0)
}

export function deleteHistory(i, history) {
  let messageHistory=store.messageHistory.getValue()
  history.messages.splice(i, 1)
  messageHistory=messageHistory.filter(x=>x.messages.length)
  store.messageHistory.setValue([...messageHistory])
  api.saveMessages()
}

export function useAutoSave() {
  const throttleSave=React.useCallback(throttle(api.saveConfig, 1e3), [])
  React.useEffect(throttleSave, [
    store.apiKey.useValue(),
    store.prompt.useValue(),
    store.contextLength.useValue(),
    store.temperature.useValue(),
    store.model.useValue(),
    store.customPrompt.useValue(),
    store.sendWithHistory.useValue(),
    store.enterSend.useValue(),
    store.multiLineInput.useValue(),
  ])
}

export function deleteHistories() {
  store.messageHistory.setValue([])
  api.saveMessages()
}

export function reloadAnswer(i) {
  const messages=store.messages.getValue()
  messages.list[i]=newMsg()
  ask(messages.list[i-1].text, messages.list[i])
  store.messages.setValue({...messages})
}
