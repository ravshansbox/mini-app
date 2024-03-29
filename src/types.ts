import { type IncomingMessage, type ServerResponse } from 'node:http';
import { type MatchFunction } from 'path-to-regexp';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HandlerParams = {
  request: IncomingMessage;
  response: ServerResponse;
  pathParams: Record<string, string>;
  searchParams: URLSearchParams;
  next: () => Promise<void>;
};

export type Handler = (params: HandlerParams) => void | Promise<void>;

export type Route = {
  method?: Method;
  path?: string;
  handler: Handler;
};

export type RouteWithMatch = Route & {
  match?: MatchFunction<Record<string, string>>;
};

export class HttpError extends Error {
  constructor(
    public readonly details: unknown,
    public readonly statusCode: number,
  ) {
    super(typeof details === 'string' ? details : undefined);
  }
}

export const HEADERS = {
  CONTENT_TYPE: 'content-type',
} as const;

export const CONTENT_TYPES = {
  JSON: 'application/json',
} as const;
