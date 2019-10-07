import { IncomingMessage, ServerResponse } from 'http';
import { IMiddleware, IMiddlewareContext, IMiddlewareHandler, IMiddlewareMatch } from './types';

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
          response.end(`No match for ${request.method}:${request.url}\n`);
        }
        return;
      }
      if (!middleware.match(request)) {
        processMiddleware(index + 1);
        return;
      }
      context.previousMatch = true;
      try {
        middleware.handler(request, response, context, () => processMiddleware(index + 1));
      } catch (error) {
        response.statusCode = 500;
        response.end(`Something went wrong on ${request.method}:${request.url}\n`);
      }
    };
    processMiddleware(0);
  };

  return { registerMiddleware, requestListener };
};
