# Mini app

## Usage examples

```

import { createServer } from 'node:http';
import { createRequestListener, createRouter, listen, sendJson } from '@ravshansbox/mini-app';

const infoRouter = createRouter();
infoRouter.get('/about', ({ response }) => {
  sendJson(response, { message: 'Mini app' }, 200);
});

const testRouter = createRouter();
testRouter.get('/:id', ({ pathParams, searchParams, response }) => {
  sendJson(response, { pathParams, searchParams }, 200);
});

const app = createRouter();
app.addRoutes('/info', infoRouter.routes);
app.addRoutes('/test', testRouter.routes);

const server = createServer();
server.on('request', createRequestListener(app.routes));
const addressInfo = await listen(server, 8080);

console.info('Listening on', addressInfo);

```

Execute

```
curl "localhost:8080/info/about"
```

and

```
curl "localhost:8080/test/123?q=456"
```
