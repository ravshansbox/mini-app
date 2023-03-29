import { type Server } from 'node:http';

export const close = (server: Server) => {
  return new Promise<void>((resolve, reject) => {
    server.close((error) => {
      error ? reject(error) : resolve();
    });
  });
};
