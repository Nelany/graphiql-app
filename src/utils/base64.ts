import base64url from 'base64url';

export const encode64 = (str: string): string => base64url(str);

export const decode64 = (str: string): string => base64url.decode(str);
