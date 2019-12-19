import { Handler } from './types';

export const asyncHandler = (handler: Handler<Promise<any>>): Handler => {
  return (request, response, context, next) => {
    handler(request, response, context, next).catch(next);
  };
};
