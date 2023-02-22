import { describe, expect, it } from 'vitest';
import { createRouter } from '../src';

describe('createRouter', () => {
  it('should not throw an error', () => {
    expect(() => createRouter()).not.toThrow();
  });
});
