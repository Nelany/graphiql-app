export const encode64 = (str: string): string => Buffer.from(str).toString('base64');

export const decode64 = (str: string): string => Buffer.from(str, 'base64').toString('utf-8');
