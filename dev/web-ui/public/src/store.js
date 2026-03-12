import React from 'react'
import createSharedState from 'react-cross-component-state'
import {newUUID, formatTime, markdown, throttle, isLocalServer, isWideScreen} from '/utils'
import buildChatPatch from '/utils/patch'
import * as api from '/api'

export const store={
  activeTabIdx: createSharedState(0),

  apiKey: createSharedState(_=>({
    enable: isLocalServer()? false: true,
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
  messageHistoryV2: createSharedState(_=>([])),

  sendWithHistory: createSharedState(false),
  enterSend: createSharedState(true),
  multiLineInput: createSharedState(false),

  inputValue: createSharedState(''),

  dialogData: createSharedState({
    show: false,
    title: null,
    content: null,
  }),

  wideScreen: createSharedState(isWideScreen()),

  hideInput: createSharedState(false),

  about: document.querySelector('[type="text/x-template"][id="site-about"]')?.innerHTML,
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
  const ret={
    prompt: store.prompt.getValue(),
    customPrompt: store.customPrompt.getValue(),
  }

  ret.customPrompt.list.map(x=>{
    if(!x.id) x.id='old-'+newUUID()
  })

  const _url=URL.createObjectURL(new Blob([encodeURIComponent(JSON.stringify(ret))], {type: 'text/plain'}))

  const a=document.body.appendChild(document.createElement('a'))
  a.href=_url
  a.download='setting.txt'
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(_url)
}

function loadSetting(text, slient) {
  try {
    const s=JSON.parse(decodeURIComponent(text))
    for(const k in s) {
      if(k==='customPrompt') {
        const oldval=store[k].getValue()
        const newval=s[k].list.reduce((o, x)=>{
          if(x.id) {
            o[x.id]=x
          }
          return o
        }, {})
        if(!oldval.list.find(x=>x.id)) { // old type values have not `id`, replace all of them by new type values
          oldval.list=[]
        }else{
          oldval.list.map(o=>{
            if(!newval[o.id]) return;
            Object.assign(o, newval[o.id])
            delete newval[o.id]
          })
        }
        for(let id in newval) {
          oldval.list.push(newval[id])
        }
        s[k]=oldval
      }
      store[k]?.setValue(s[k])
    }
    slient || alertModal('Import config successful!')
  }catch(e) {
    console.log(e)
    slient || alertModal(<>
      <div>Failed to load config:</div>
      <pre>{e.stack}</pre>
    </>)
  }
}

function alertModal(msg) {
  return new Promise(resolve=>{
    store.dialogData.setValue({
      show: true,
      title: 'ollama-ui',
      content: <div className='alert-model-content'>{msg}</div>,
      onConfirm: resolve,
      // large: true,
      cancelButton: false,
    })
  })
}

export async function importDefaultSetting(slient) {
  const f=await fetch('https://raw.githubusercontent.com/kagami-arch-jp/ollama-ui/refs/heads/main/dist/setting.txt')
  loadSetting(await f.text(), slient)
}

export function importSetting() {
  const inp=document.createElement('input')
  inp.type='file'
  inp.accept='.txt'
  inp.className='hidden-btn'
  inp.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      loadSetting(await file.text())
    }
    inp.remove();
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
    subdata: {},
    thinking: '',
    html: '',
    model: isQuestion? '': getModelName(),
    time: formatTime(),
    isPending: isQuestion? false: true,
    isError: false,
    isActive: false,
  }
}

export function ask(question, answerIdx=-1) {
  const messages=store.messages.getValue()
  messages.isResponsing=true

  const isNewQuestion=answerIdx===-1
  const ans=isNewQuestion? newMsg(): messages.list[answerIdx]

  if(isNewQuestion) {
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
    const toHtml=ans=>{
      ans.html=[
        ans.thinking && `<div class="think">${markdown(ans.thinking)}</div>`,
        ans.text && markdown(ans.text),
      ].filter(Boolean).join('')
    }
    toHtml(ans)
    for(let key in ans.subdata) {
      toHtml(ans.subdata[key])
    }
    if(err || isEnd) {
      api.resetOllamaClient()
      ans.isPending=false
      messages.isResponsing=false
    }

    store.messages.setValue({
      ...messages,
    })
  }, 200)

  const sendWithHistory=store.sendWithHistory.getValue()

  const history=messages.list.slice(0, isNewQuestion? messages.list.length-1: answerIdx)

  const msgs=resolveHistory(history, sendWithHistory)

  const messagesParam=msgs.filter(x=>!x.ignore).map(
    ({isQuestion, text, thinking})=>({
      role: isQuestion? 'user': 'system',
      content: text,
      thinking,
    })
  )

  api.chat(messagesParam, (e, isEnd, ret)=>{
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

export function resolveHistory(history, sendWithHistory) {
  const msgs=[]
  const ques=history.pop()
  msgs.push({isQuestion: true, text: getPresetPrompt(true)})
  if(sendWithHistory) {
    msgs.push(...history, ques)
  }else{
    msgs.push(ques)
  }
  return msgs
}

export function newChat() {
  const messages=store.messages.getValue()
  let messageHistoryV2=store.messageHistoryV2.getValue()
  store.messageHistoryV2.setValue([...messageHistoryV2, ...messages.list])
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
  const messageHistoryV2=store.messageHistoryV2.useValue()
  return messageHistoryV2.length
}

export function deleteHistory(key) {
  let messageHistoryV2=store.messageHistoryV2.getValue()
  for(let i=0; i<messageHistoryV2.length; i++) {
    if(messageHistoryV2[i].key!==key) continue
    messageHistoryV2.splice(i, 1)
    break
  }
  store.messageHistoryV2.setValue([...messageHistoryV2])
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
  store.messageHistoryV2.setValue([])
  api.saveMessages()
}

export function reloadAnswer(i) {
  const messages=store.messages.getValue()
  messages.list[i]=newMsg()
  ask(messages.list[i-1].text, i)
  store.messages.setValue({...messages})
}

export function useWideScreenChange() {
  React.useEffect(_=>{
    let _width=innerWidth, _height=innerHeight
    const fn=_=>{
      if(innerHeight<_height && innerWidth===_width) return;
      _width=innerWidth
      _height=innerHeight
      store.wideScreen.setValue(isWideScreen())
    }
    window.addEventListener('resize', fn)
    return _=>window.removeEventListener('resize', fn)
  }, [])
}

export function newCustomPrompt() {
  const {customPrompt}=store
  const val=customPrompt.getValue()
  val.list.unshift({title: 'Untitled', content: '', id: newUUID()})
  val.idx=0
  customPrompt.setValue({...val})
}

export function selectPrompt(idx) {
  const {customPrompt}=store
  const val=customPrompt.getValue()
  if(idx<0) {
    val.enable=false
  }else{
    val.idx=0
    val.list.unshift(val.list.splice(idx, 1)[0])
    val.enable=true
  }
  customPrompt.setValue({...val})
}
