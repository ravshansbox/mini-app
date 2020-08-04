import { ok } from 'assert';
import { parseBody } from './parse-body';
import { Handler, RpcMethodDefinition } from './types';

const contentType = 'application/json';

export const rpcHandlerFactory = (
  methods: Record<string, RpcMethodDefinition>,
): Handler => {
  return async (request, response, context, next) => {
    try {
      ok(
        request.headers['content-type'] === contentType,
        'content type must be application/json',
      );
      const rawBody = await parseBody(request);
      const body = JSON.parse(rawBody.toString());
      ok('method' in body, 'method is required');
      const { method, params } = body;
      ok(typeof method === 'string', 'method must be of type string');
      ok(method in methods, 'invalid method');
      const definition = methods[method];
      const { handler } = definition;
      ok(typeof handler === 'function', 'invalid method definition');
      const result = await handler(params, context);
      response.setHeader('content-type', contentType);
      response.end(JSON.stringify({ result }));
    } catch (error) {
      next(error);
    }
  };
};
