import { IncomingMessage, ServerResponse } from 'http';

export type IMiddlewareMatch = (request: IncomingMessage) => boolean;

export type IMiddlewareHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  next?: () => void,
) => void;

export interface IMiddleware {
  match: IMiddlewareMatch;
  handler: IMiddlewareHandler;
}

export const appFactory = () => {
  const middlewares: IMiddleware[] = [];

  const registerMiddleware = (match: IMiddlewareMatch, handler: IMiddlewareHandler) => {
    middlewares.push({ match, handler });
  };

  const requestListener = (request: IncomingMessage, response: ServerResponse) => {
    let match = false;
    const processMiddleware = (index: number) => {
      const middleware = middlewares[index];
      if (!middleware) {
        if (!match) {
          response.statusCode = 404;
          response.end(`No match for ${request.method}:${request.url}`);
        }
        return;
      }
      if (!middleware.match(request)) {
        processMiddleware(index + 1);
        return;
      }
      match = true;
      middleware.handler(request, response, () => processMiddleware(index + 1));
    };
    processMiddleware(0);
  };

  return { registerMiddleware, requestListener };
};
