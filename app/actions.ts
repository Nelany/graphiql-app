export const fetchData = async (
  method: string,
  url: string | undefined,
  body: string | undefined,
  headers: { key: string; value: string }[] | undefined
) => {
  'use server';
  if (!url) {
    return { response: undefined, status: 0, statusText: 'URL is required' };
  }

  if (method === 'GET' && body) {
    return { response: undefined, status: 0, statusText: 'GET requests should not have a body' };
  }
  const options: RequestInit = {
    method,
    headers:
      headers && headers.length > 0
        ? Object.fromEntries(
            headers.filter(({ key, value }) => key !== '' && value !== '').map(({ key, value }) => [key, value])
          )
        : undefined,
    body: body || undefined,
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
