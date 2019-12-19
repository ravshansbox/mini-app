import { IncomingMessage } from 'http';

export const parseBody = (request: IncomingMessage) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks = [];
    request.on('data', chunk => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    request.on('error', reject);
  });
};
