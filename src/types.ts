import { IncomingMessage, ServerResponse } from 'http';

export interface IMap<T = any> {
  [key: string]: T;
}

export interface IMiddlewareContext extends IMap {
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
