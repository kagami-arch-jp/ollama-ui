<?js

const {default: ollama, Ollama}=require('ollama');

const OLLAMA_API_KEY=$_RAW_REQUEST.headers['x-ollama-apikey'] || $_QUERY.apikey || process.env.OLLAMA_API_KEY

// ------------------------------------------------------------
// Ollama API 呼び出しラッパー
// ------------------------------------------------------------
async function callOllamaApi(apiMethod, { apiKey, onClient, onData, onEnd, query } = {}) {
  apiKey=apiKey || OLLAMA_API_KEY

  // API キーがあれば認証付きクライアント、無ければデフォルトクライアント
  const client = apiKey
    ? new Ollama({
        host: 'https://ollama.com',
        headers: { Authorization: 'Bearer ' + apiKey }
      })
    : ollama;

  try{
    const response = await client[apiMethod](query);

    // onData が無い場合は単なる結果オブジェクトを返す
    if (!onData) return response;

    onClient && onClient(client)

    // ストリーミング結果をコールバックで流す
    try {
      for await (const part of response) {
        onData(null, false, part);
      }
      onData(null, true, null);
    } catch (e) {
      throw e
    }
  }catch(e) {
    onData(e, true, null);
  }

  onEnd && onEnd(client)
}

Application.OLLAMA_CLIENTS=Application.OLLAMA_CLIENTS || {}
const CLIENT_KEY=apiKey || 'local'
function bindClient(c) {
  Application.OLLAMA_CLIENTS[CLIENT_KEY]=c
}
function unbindClient(destory=true) {
  if(destory) {
    Application.OLLAMA_CLIENTS[CLIENT_KEY]?.abort?.()
  }
  delete Application.OLLAMA_CLIENTS[CLIENT_KEY]
}

class App{

  // Ollama のモデル一覧取得
  async listModelsAction() {
    const { models } = await callOllamaApi('list');
    return models.map(m=>m.name)
  }

  // チャット（ストリーミング）処理
  async chatAction() {
    const requestBody = JSON.parse(await Utils.rs2Buffer($_RAW_REQUEST));

    /*
    // mock
    await Utils.sleep(1e3)
    for(let i=0; i<100; i++) {
      echo('{"content":"xx'+i+'"}\r\n\r\n');
      await Utils.sleep(12)
      flush()
    }
    return;
    */

    echo('{"":"'+'x'.repeat(4096)+'"}\n')
    flush()

    await callOllamaApi('chat', {
      query: { ...requestBody, stream: true },
      onClient: client=>{
        bindClient(client)
      },
      onEnd: client=>{
        unbindClient()
      },
      onData: (err, isEnd, part) => {
        if (err) {
          console.log({ err: err.message });
          echo('{"content":"\\n### Server Error"}');
        } else if (part) {
          const { content, thinking } = part.message;
          echo(JSON.stringify({ content, thinking }) + '\n');
        }
        flush();
      },
    });
  }

  // チャットリセット（Ollama のリクエストを中断）
  resetChatAction() {
    unbindClient()
    return true;
  }
}

exports({
  callOllamaApi,
  App,
  bindClient,
  unbindClient,
})
