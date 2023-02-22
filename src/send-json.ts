import { type ServerResponse } from 'http';

export const sendJson = (response: ServerResponse, payload: any, statusCode: number) => {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify(payload));
  response.statusCode = statusCode;
};
