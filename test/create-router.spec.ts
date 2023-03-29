import fetch from 'node-fetch';
import { Server, createServer } from 'node:http';
import { type AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { close, createRequestListener, createRouter, listen } from '../src';

describe('empty router', () => {
  let server: Server;
  let address: AddressInfo;

  beforeAll(async () => {
    const router = createRouter();
    server = createServer(createRequestListener(router.routes));
    address = await listen(server);
    console.info(`Listening on port ${address.port}`);
  });

  afterAll(async () => {
    await close(server);
  });

  it('should respond correctly', async () => {
    const method = 'GET';
    const path = '/';
    const response = await fetch(`http://localhost:${address.port}${path}`, { method });
    const data = await response.json();
    expect(data).toEqual({ message: `No route for ${method} ${path}` });
  });
});
