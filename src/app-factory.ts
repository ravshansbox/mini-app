import { IncomingMessage, ServerResponse } from 'http';

export interface IMiddlewareContext {
  previousMatch: boolean;
}

export type IMiddlewareHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  context: IMiddlewareContext,
  next?: () => void,
) => void;

export type IMiddlewareMatch = (request: IncomingMessage) => boolean;

export interface IMiddleware {
  handler: IMiddlewareHandler;
  match: IMiddlewareMatch;
}

export const appFactory = () => {
  const middlewares: IMiddleware[] = [];

  const registerMiddleware = (match: IMiddlewareMatch, handler: IMiddlewareHandler) => {
    middlewares.push({ match, handler });
  };

  const requestListener = (request: IncomingMessage, response: ServerResponse) => {
    const context: IMiddlewareContext = { previousMatch: false };
    const processMiddleware = (index: number) => {
      const middleware = middlewares[index];
      if (!middleware) {
        if (!context.previousMatch) {
          response.statusCode = 404;
          response.end(`No match for ${request.method}:${request.url}`);
        }
        return;
      }
      if (!middleware.match(request)) {
        processMiddleware(index + 1);
        return;
      }
      context.previousMatch = true;
      middleware.handler(request, response, context, () => processMiddleware(index + 1));
    };
    processMiddleware(0);
  };

  return { registerMiddleware, requestListener };
};
