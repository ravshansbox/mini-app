import { type ServerResponse } from 'http';
import { CONTENT_TYPES, HEADERS } from './types';

export const sendJson = (response: ServerResponse, payload: any, statusCode: number) => {
  response.statusCode = statusCode;
  response.setHeader(HEADERS.CONTENT_TYPE, CONTENT_TYPES.JSON);
  response.end(JSON.stringify(payload));
};
