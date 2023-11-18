import { type ServerResponse } from 'node:http';
import { CONTENT_TYPES, HEADERS } from './types';

export const sendJson = (response: ServerResponse, payload: unknown, statusCode = 200) => {
  response.statusCode = statusCode;
  response.setHeader(HEADERS.CONTENT_TYPE, CONTENT_TYPES.JSON);
  response.end(JSON.stringify(payload));
};
