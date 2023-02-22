# Mini app

## Usage examples

```

import { createServer } from 'node:http';
import { createRequestListener, createRouter, sendJson } from '@ravshansbox/mini-app';

const app = createRouter();

const infoRouter = createRouter();

infoRouter.addRoute({
  method: 'GET',
  path: '/about',
  handler: ({ response }) => {
    sendJson(response, { message: 'Mini app' }, 200);
  },
});

infoRouter.addRoute({
  method: 'GET',
  path: '/version',
  handler: ({ response }) => {
    sendJson(response, { message: '0.0.1' }, 200);
  },
});

app.addRoutes('/info', infoRouter.routes);

const server = createServer();

server.on('request', createRequestListener(app.routes));

server.on('listening', () => {
  console.info('Listening on', server.address());
});

server.listen(8080);

```
