<?js

const {default: ollama, Ollama}=require('ollama');

const apiKey=$_RAW_REQUEST.headers['x-ollama-apikey'] || $_QUERY.apikey

// ------------------------------------------------------------
// Ollama API 呼び出しラッパー
// ------------------------------------------------------------
async function callOllamaApi(apiMethod, { onClient, onData, onEnd, query } = {}) {
  // API キーがあれば認証付きクライアント、無ければデフォルトクライアント
  const client = apiKey
    ? new Ollama({
        host: 'https://ollama.com',
        headers: { Authorization: 'Bearer ' + apiKey }
      })
    : ollama;

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
  } catch (err) {
    onData(err, true, null);
  }

  onEnd && onEnd(client)
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
        Application.OLLAMA_CHAT_CLIENT=client
      },
      onEnd: client=>{
        if(Application.OLLAMA_CHAT_CLIENT===client) {
          Application.OLLAMA_CHAT_CLIENT=null
        }
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
    Application.OLLAMA_CHAT_CLIENT?.abort();
    Application.OLLAMA_CHAT_CLIENT=null
    return true;
  }
}

exports({
  callOllamaApi,
  App,
})
