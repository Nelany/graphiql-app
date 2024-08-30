import { toast } from 'react-toastify';

export const fetchData = async (
  method: string,
  url: string | undefined,
  body: string | undefined,
  headers: { key: string; value: string }[] | undefined
) => {
  'use server';
  if (!url) {
    toast.error('URL is required');
    return;
  }
  console.warn(method, url, body, headers);
  const options: RequestInit = {
    method,
    headers:
      headers && headers.length > 0
        ? Object.fromEntries(
            headers.filter(({ key, value }) => key !== '' && value !== '').map(({ key, value }) => [key, value])
          )
        : undefined,
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(url, options);
  if (!response.ok || (response.status >= 400 && response.status < 600)) {
    toast.error(`Network response was not ok: ${response.status} ${response.statusText}`);
    return;
  }
  const data = await response.json();
  return { response: data, status: response.status, statusText: response.statusText };
};
