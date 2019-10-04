import { appFactory } from '../src/app-factory';

describe('appFactory', () => {
  it('should work', () => {
    expect(() => appFactory()).not.toThrow();
  });
});
