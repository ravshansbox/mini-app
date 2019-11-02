import { IHandler } from './types';

export const asyncHandler = (handler: IHandler<Promise<any>>): IHandler => {
  return (request, response, context, next) => {
    handler(request, response, context, next).catch(next);
  };
};
