# Mini app

## Usage examples

```

import { createServer } from 'node:http';
import { createRequestListener, createRouter, sendJson } from '@ravshansbox/mini-app';

const infoRouter = createRouter();
infoRouter.addRoute({
  method: 'GET',
  path: '/about',
  handler: ({ response }) => {
    sendJson(response, { message: 'Mini app' }, 200);
  },
});

const testRouter = createRouter();
testRouter.addRoute({
  method: 'GET',
  path: '/:id',
  handler: ({ pathParams, searchParams, response }) => {
    sendJson(response, { pathParams, searchParams }, 200);
  },
});

const app = createRouter();
app.addRoutes('/info', infoRouter.routes);
app.addRoutes('/test', testRouter.routes);

const server = createServer();

server.on('request', createRequestListener(app.routes));

listen(server, 8080).then((addressInfo) => {
  console.info('Listening on', addressInfo);
});

```

Execute

```
curl "localhost:8080/info/about"
```

and

```
curl "localhost:8080/test/123?q=456"
```
