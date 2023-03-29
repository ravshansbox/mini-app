import { type RequestListener } from 'node:http';
import { sendJson } from './send-json';
import { HttpError, type RouteWithMatch } from './types';

export const createRequestListener = (routesWithMatch: RouteWithMatch[]): RequestListener => {
  return async (request, response) => {
    const { pathname, searchParams } = new URL(request.url ?? '', `http://${request.headers.host}`);
    let matched = false;
    const processRoute = async (routeIndex: number) => {
      if (routeIndex > routesWithMatch.length - 1) {
        return;
      }
      const route = routesWithMatch[routeIndex];
      const { method, match, handler } = route;
      if (method !== undefined && method !== request.method) {
        return;
      }
      let pathParams: Record<string, string> = {};
      if (match !== undefined) {
        const matchResult = match(pathname);
        if (matchResult === false) {
          return;
        }
        pathParams = matchResult.params;
      }
      matched = true;
      let nextIsCalled = false;
      const next = () => {
        nextIsCalled = true;
        return processRoute(routeIndex + 1);
      };
      try {
        const result = handler({ request, response, pathParams, searchParams, next });
        if (result instanceof Promise) {
          await result;
        }
        if (!nextIsCalled) {
          await next();
        }
      } catch (error) {
        let statusCode = 500;
        let message: string | object = 'Something went wrong';
        if (error instanceof Error) {
          message = error.message;
        }
        if (error instanceof HttpError) {
          statusCode = error.statusCode;
          message = error.details;
        }
        sendJson(response, { message }, statusCode);
        console.error(error);
      }
    };
    for (let routeIndex = 0; routeIndex < routesWithMatch.length; routeIndex++) {
      await processRoute(routeIndex);
    }
    if (!matched) {
      sendJson(response, { message: `No route for ${request.method} ${pathname}` }, 404);
    }
  };
};
