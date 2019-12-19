import { IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';

export interface Hash<T = any> {
  [key: string]: T;
}

export interface Context extends Hash {
  previousMatch: boolean;
  url: UrlWithParsedQuery;
}

export type Next = (error?: Error) => void;

export type Handler<T = void> = (
  request: IncomingMessage,
  response: ServerResponse,
  context: Context,
  next: Next,
) => T;

export type Match = (request: IncomingMessage, context: Context) => boolean;

export interface Middleware {
  handler: Handler;
  match: Match;
}
