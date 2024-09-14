import { getIntrospectionQuery } from 'graphql';
import { Mock } from 'vitest';
import { fetchData, fetchSDL } from '../../actions';

global.fetch = vi.fn();

describe('fetchData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns error if URL is not provided', async () => {
    const result = await fetchData({ method: 'GET', url: '', body: '', headers: [], variables: {} });
    expect(result).toEqual({ response: undefined, status: 0, statusText: 'URL is required' });
  });

  it('returns error if GET request has a body', async () => {
    const result = await fetchData({
      method: 'GET',
      url: 'http://example.com',
      body: 'body',
      headers: [],
      variables: {},
    });
    expect(result).toEqual({ response: undefined, status: 0, statusText: 'GET requests should not have a body' });
  });

  it('makes a successful request and returns data', async () => {
    const mockResponse = { data: 'test' };
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchData({
      method: 'POST',
      url: 'http://example.com',
      body: 'body',
      headers: [],
      variables: {},
    });
    expect(result).toEqual({ response: mockResponse, status: 200, statusText: 'OK' });
  });

  it('returns error if response is not ok', async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await fetchData({
      method: 'POST',
      url: 'http://example.com',
      body: 'body',
      headers: [],
      variables: {},
    });
    expect(result).toEqual({ response: undefined, status: 404, statusText: 'Not Found' });
  });

  it('returns error if fetch throws an error', async () => {
    const errorMessage = 'Network error';
    (global.fetch as Mock).mockRejectedValue(new Error(errorMessage));

    const result = await fetchData({
      method: 'POST',
      url: 'http://example.com',
      body: 'body',
      headers: [],
      variables: {},
    });
    expect(result).toEqual({ response: undefined, status: 0, statusText: `${errorMessage}. Please check the URL.` });
  });
});

describe('fetchSDL', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('makes a successful request and returns SDL data', async () => {
    const mockResponse = { data: 'SDL data' };
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchSDL('http://example.com');
    expect(result).toEqual('SDL data');
    expect(global.fetch).toHaveBeenCalledWith('http://example.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
  });

  it('returns error if fetch throws an error', async () => {
    const errorMessage = 'Network error';
    (global.fetch as Mock).mockRejectedValue(new Error(errorMessage));

    await expect(fetchSDL('http://example.com')).rejects.toThrow(errorMessage);
  });
});
