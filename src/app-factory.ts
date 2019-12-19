import { IncomingMessage, ServerResponse } from 'http';
import { parse as urlParse, UrlWithParsedQuery } from 'url';
import { Context, Handler, Match, Middleware, Next } from './types';

export const appFactory = () => {
  const middlewares: Middleware[] = [];

  const registerMiddleware = (match: Match, handler: Handler) => {
    middlewares.push({ match, handler });
  };

  const requestListener = (request: IncomingMessage, response: ServerResponse) => {
    const context: Context = {
      previousMatch: false,
      url: request.url ? urlParse(request.url, true) : ({ query: {} } as UrlWithParsedQuery),
    };
    const processMiddleware = (index: number) => {
      const middleware = middlewares[index];
      if (!middleware) {
        if (!context.previousMatch) {
          response.statusCode = 404;
          response.end(`No match for ${request.method}:${request.url}\n`);
        }
        return;
      }
      if (!middleware.match(request, context)) {
        processMiddleware(index + 1);
        return;
      }
      context.previousMatch = true;

      const handleError = (error: Error) => {
        console.error(error);
        response.statusCode = 500;
        response.end(`Something went wrong on ${request.method}:${request.url}\n`);
      };

      try {
        const next: Next = error => {
          if (error) {
            handleError(error);
          } else {
            processMiddleware(index + 1);
          }
        };
        middleware.handler(request, response, context, next);
      } catch (error) {
        handleError(error);
      }
    };
    processMiddleware(0);
  };

  return { registerMiddleware, requestListener };
};
