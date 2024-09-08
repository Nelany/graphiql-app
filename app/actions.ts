'use server';

import { getIntrospectionQuery } from 'graphql';

import { Action } from '@/Types/Types';

export const fetchData = async ({ method, url, body, headers, variables }: Action) => {
  'use server';
  if (!url) {
    return { response: undefined, status: 0, statusText: 'URL is required' };
  }

  if (method === 'GET' && body) {
    return { response: undefined, status: 0, statusText: 'GET requests should not have a body' };
  }
  const options: RequestInit = {
    method: method === 'GRAPHQL' ? 'POST' : method,
    headers:
      headers && headers.length > 0
        ? Object.fromEntries(
            headers.filter(({ key, value }) => key !== '' && value !== '').map(({ key, value }) => [key, value])
          )
        : undefined,

    body: (method === 'GRAPHQL' ? JSON.stringify({ query: body, variables }) : body) || undefined,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok || (response.status >= 400 && response.status < 600)) {
      return { response: undefined, status: response.status, statusText: response.statusText };
    }
    const data = await response.json();
    return { response: data, status: response.status, statusText: response.statusText };
  } catch (error) {
    return { response: undefined, status: 0, statusText: (error as Error).message };
  }
};

export const fetchSDL = async (endpointUrlSdl: string | URL | Request) => {
  const response = await fetch(endpointUrlSdl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const result = await response.json();
  return result.data;
};
