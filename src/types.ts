import { type IncomingMessage, type ServerResponse } from 'http';
import { type MatchFunction } from 'path-to-regexp';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HandlerParams = {
  request: IncomingMessage;
  response: ServerResponse;
  pathParams: Record<string, string>;
  searchParams: URLSearchParams;
};

export type Handler = (params: HandlerParams) => void | Promise<void>;

export type Route = {
  method: Method;
  path: string;
  handler: Handler;
};

export type RouteWithMatch = Route & {
  match: MatchFunction<Record<string, string>> | null;
};

export class HttpError extends Error {
  constructor(public readonly details: any, public readonly statusCode: number) {
    super(typeof details === 'string' ? details : undefined);
  }
}
