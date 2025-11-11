<?js
const {App: OllamaApp}=include(__dirname+'/ollama.s')

class App{
  static async run() {
    if($_PATHNAME==='/') {
      setResponseHeaders({
        'content-type': 'text/html; charset=utf8',
        'cache-Control': 'no-cache, no-store, must-revalidate',
        pragma: 'no-cache',
        expires: 0,
      });
      sendFile(__dirname+'/../dist/index.html');
    }else if($_PATHNAME==='/sw.js') {
      setResponseHeaders({
        'content-type': 'text/html; charset=utf8',
        'cache-Control': 'no-cache, no-store, must-revalidate',
        pragma: 'no-cache',
        expires: 0,
      });
      sendFile(__dirname+'/../dist/sw.js');
    }else{
      const actionName=this.getActionName()

      const result = { success: true, result: null, error: null };

      const router = new OllamaApp;
      try {
        const actionResult = await router[actionName]();
        if (actionResult === undefined) return;
        result.result = actionResult;
      } catch (err) {
        console.log({ $_PATHNAME, $_QUERY, error: err });
        result.success = false;
        result.error = err.message;
      }

      setStatus(200);
      setResponseHeaders({ 'content-type': 'text/json' });
      echo(JSON.stringify(result));
    }
  }
  static getActionName() {
    return ($_QUERY.action || $_PATHNAME.substr(1) || 'index') + 'Action';
  }

}

Sync.Push(App.run());
