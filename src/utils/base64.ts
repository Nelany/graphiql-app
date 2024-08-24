import { encode as base64Encode, decode as base64Decode } from 'base-64';

export const encode = (str: string): string => base64Encode(str);
export const decode = (str: string): string => base64Decode(str);
