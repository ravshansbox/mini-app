import { type Server } from 'node:http';
import { type AddressInfo } from 'node:net';

export const listen = (server: Server, port?: number, host?: string) => {
  return new Promise<AddressInfo>((resolve) => {
    server.listen(port, host, () => {
      resolve(server.address() as AddressInfo);
    });
  });
};
