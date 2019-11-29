import { SearchParams } from '../exceptions/search.params';
import { Like } from 'typeorm';

/**
 * Remove false fields from object
 * Example: removeEmptyFields({test: '', another: 1}) => {another: 1}
 * @param obj
 */
export function removeEmptyFields(obj: object): object {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * Preparing params for the query
 * @param params
 */
export function prepareSearchParams(params: Partial<SearchParams>) {
  const newParams: Partial<SearchParams> = {};
  Object.keys(params).forEach(key => {
    newParams[key] = Like(`%${params[key]}%`);
  });
  return newParams;
}

/**
 * Transform string to canonical format
 * Example: toCanonical('hELlO') => 'Hello'
 * @param str
 */
export function toCanonical(str: string): string {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}
