# Mini app
## Usage examples
```
import { createServer } from 'http';
import { appFactory } from '@ravshansbox/mini-app';

const app = appFactory();

app.registerMiddleware(
  ({ method, url }) => {
    return method === 'GET' && url.startsWith('/about');
  },
  (_request, response) => {
    response.end(`mini app\n`);
  },
);

app.registerMiddleware(
  ({ method, url }) => {
    return method === 'GET' && url.startsWith('/version');
  },
  (_request, response) => {
    response.end(`0.0.1\n`);
  },
);

createServer(app.requestListener).listen(8080, () => {
  process.stdout.write('Listening on port 8080\n');
});
```
