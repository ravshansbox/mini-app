import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';

export interface IMap<T = any> {
  [key: string]: T;
}

export interface IContext extends IMap {
  previousMatch: boolean;
  url: UrlWithParsedQuery;
}

export type INext = (error?: Error) => void;

export type IHandler<T = void> = (
  request: IncomingMessage,
  response: ServerResponse,
  context: IContext,
  next: INext,
) => T;

export type IMatch = (
  request: IncomingMessage,
  context: IContext,
) => boolean;

export interface IMiddleware {
  handler: IHandler;
  match: IMatch;
}
