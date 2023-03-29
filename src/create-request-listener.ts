import { type RequestListener } from 'node:http';
import { sendJson } from './send-json';
import { HttpError, type RouteWithMatch } from './types';

export const createRequestListener = (routesWithMatch: RouteWithMatch[]): RequestListener => {
  return async (request, response) => {
    const { pathname, searchParams } = new URL(request.url ?? '', `http://${request.headers.host}`);
    let matched = false;
    for (const { method, match, handler } of routesWithMatch) {
      const isMethodOK = method === undefined || method === request.method;
      if (!isMethodOK) {
        continue;
      }
      let isPathOK = false;
      let pathParams: Record<string, string> = {};
      if (match === undefined) {
        isPathOK = true;
      } else {
        const matchResult = match(pathname);
        if (matchResult !== false) {
          isPathOK = true;
          pathParams = matchResult.params;
        }
      }
      if (!isPathOK) {
        continue;
      }
      matched = true;
      try {
        const result = handler({ request, response, pathParams, searchParams });
        if (result instanceof Promise) {
          await result;
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
    }
    if (!matched) {
      sendJson(response, { message: `No route for ${request.method} ${pathname}` }, 404);
    }
  };
};
