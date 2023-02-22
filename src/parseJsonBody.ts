import { type IncomingMessage } from 'node:http';
import { collectChunks } from './collect-chunks';
import { CONTENT_TYPES, HEADERS } from './types';

export const parseJsonBody = async (request: IncomingMessage) => {
  if (request.headers[HEADERS.CONTENT_TYPE] !== CONTENT_TYPES.JSON) {
    return;
  }
  const body = await collectChunks(request);
  const bodyString = body.toString();
  if (body.length === 0) {
    return;
  }
  try {
    return JSON.parse(bodyString);
  } catch (error) {
    console.error('Could not parse JSON');
    console.log(bodyString);
  }
};
