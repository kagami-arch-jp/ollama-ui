import {callApi, isLocalServer} from '/utils'
import {store} from '/store'
import * as _store from '/store'

export async function getModels() {
  return callApi('listModels')
}
export async function resetOllamaClient() {
  return callApi('resetChat')
}

export async function chat(msgs, onData) {
  const modelName=_store.getModelName()
  const temperature=parseFloat(store.temperature.getValue())
  const num_ctx=parseInt(store.contextLength.getValue())

  return callApi('chat', {
    postData: JSON.stringify({
      model: modelName,
      messages: msgs.map(
        ({isQuestion, text, thinking})=>({
          role: isQuestion? 'user': 'system',
          content: isQuestion && text.indexOf('```')===-1?
            '```plain\n'+text+'\n```':
            text,
          thinking,
        })
      ),
      options: {
        temperature,
        num_ctx,
      }
    }),
    onData,
  })
}

export function loadConfig() {
  try{
    const [
      apiKey,
      prompt,
      contextLength,
      temperature,
      model,
      customPrompt,

      sendWithHistory,
      enterSend,
      multiLineInput,

    ]=JSON.parse(localStorage.getItem('ollama-webui-state-config'))

    if(!isLocalServer()) apiKey.enable=true

    store.apiKey.setValue(apiKey)
    store.prompt.setValue(prompt)
    store.contextLength.setValue(contextLength)
    store.temperature.setValue(temperature)
    store.model.setValue(model)
    store.customPrompt.setValue(customPrompt)

    store.sendWithHistory.setValue(sendWithHistory)
    store.enterSend.setValue(enterSend)
    store.multiLineInput.setValue(multiLineInput)

  }catch(e) {}
}

export function saveConfig() {
  const settings=JSON.stringify([
    store.apiKey.getValue(),
    store.prompt.getValue(),
    store.contextLength.getValue(),
    store.temperature.getValue(),
    store.model.getValue(),
    store.customPrompt.getValue(),

    store.sendWithHistory.getValue(),
    store.enterSend.getValue(),
    store.multiLineInput.getValue(),

  ])
  localStorage.setItem('ollama-webui-state-config', settings)
}

export function loadMessages() {
  try{
    const [messages, history]=JSON.parse(localStorage.getItem('ollama-webui-state-messages'))
    store.messages.setValue(messages)
    store.messageHistory.setValue(history)
  }catch(e) {}
}

export function saveMessages() {
  try{
    const messages=store.messages.getValue()
    const messageHistory=store.messageHistory.getValue()
    localStorage.setItem('ollama-webui-state-messages', JSON.stringify([messages, messageHistory]))
  }catch(e) {}
}
