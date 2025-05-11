import {isEqual, isNil, trim} from 'lodash';

export const isEmptyValue = (v: any): v is null | undefined =>
  isNil(v) || trim(v) === '' || isEqual(v, {});
export const isNotEmptyValue = (v: any) => !isEmptyValue(v);
