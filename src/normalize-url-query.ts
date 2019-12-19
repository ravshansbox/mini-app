import { ParsedUrlQuery } from 'querystring';
import { Hash } from './types';

export const normalizeUrlQuery = (urlQuery: ParsedUrlQuery) => {
  return Object.keys(urlQuery).reduce((result, key) => {
    const value = urlQuery[key];
    result[key] = Array.isArray(value) ? value[value.length - 1] : value;
    return result;
  }, {} as Hash<string>);
};
