import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';

export interface IMap<T = any> {
  [key: string]: T;
}

export interface IMiddlewareContext extends IMap {
  previousMatch: boolean;
  url: UrlWithParsedQuery;
}

export type IMiddlewareHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  context: IMiddlewareContext,
  next: () => void,
) => void;

export type IMiddlewareMatch = (
  request: IncomingMessage,
  context: IMiddlewareContext,
) => boolean;

export interface IMiddleware {
  handler: IMiddlewareHandler;
  match: IMiddlewareMatch;
}
