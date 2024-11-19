import GraphQL from '@/components/Clients/GraphQL/GraphQl';
import RestFull from '@/components/Clients/RESTfull/RESTfull';
import { decode64 } from '@/utils/base64';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { fetchData } from '../../actions';
import RESTGraphQL from './page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));
vi.mock('@/utils/base64', () => ({
  decode64: vi.fn((str) => str),
}));
vi.mock('@/components/Clients/GraphQL/GraphQl', () => ({
  __esModule: true,
  default: vi.fn(() => <div>GraphQL Component</div>),
}));
vi.mock('@/components/Clients/RESTfull/RESTfull', () => ({
  __esModule: true,
  default: vi.fn(() => <div>RESTfull Component</div>),
}));
vi.mock('../../actions', () => ({
  fetchData: vi.fn(),
}));

describe('RESTGraphQL component', () => {
  it('redirects to /404 if slug is invalid', () => {
    render(<RESTGraphQL params={{ slug: ['INVALID'], locale: 'en' }} searchParams={{}} />);
    expect(redirect).toHaveBeenCalledWith('/404');
  });

  it('renders GraphQL component if slug is GRAPHQL', () => {
    render(<RESTGraphQL params={{ slug: ['GRAPHQL'], locale: 'en' }} searchParams={{}} />);
    expect(screen.getByText('GraphQL Component')).toBeInTheDocument();
  });

  it('renders RESTfull component if slug is valid REST method', () => {
    render(<RESTGraphQL params={{ slug: ['GET'], locale: 'en' }} searchParams={{}} />);
    expect(screen.getByText('RESTfull Component')).toBeInTheDocument();
  });

  it('decodes endpoint, body, and initialVariables correctly', () => {
    render(
      <RESTGraphQL
        params={{ slug: ['GET', 'ZW5kcG9pbnQ=', 'Ym9keQ==', 'aW5pdGlhbFZhcmlhYmxlcw=='], locale: 'en' }}
        searchParams={{}}
      />
    );
    expect(decode64).toHaveBeenCalledWith('ZW5kcG9pbnQ=');
    expect(decode64).toHaveBeenCalledWith('Ym9keQ==');
    expect(decode64).toHaveBeenCalledWith('aW5pdGlhbFZhcmlhYmxlcw==');
  });

  it('passes correct props to GraphQL component', () => {
    render(
      <RESTGraphQL
        params={{ slug: ['GRAPHQL', 'ZW5kcG9pbnQ=', 'Ym9keQ==', 'aW5pdGlhbFZhcmlhYmxlcw=='], locale: 'en' }}
        searchParams={{ header1: 'value1' }}
      />
    );
    expect(GraphQL).toHaveBeenCalledWith(
      expect.objectContaining({
        initialVariables: 'aW5pdGlhbFZhcmlhYmxlcw==',
        method: 'GRAPHQL',
        endpoint: 'ZW5kcG9pbnQ=',
        body: 'Ym9keQ==',
        headers: [{ key: 'header1', value: 'value1' }],
        locale: 'en',
        fetchData,
      }),
      {}
    );
  });

  it('passes correct props to RESTfull component', () => {
    render(
      <RESTGraphQL
        params={{ slug: ['GET', 'ZW5kcG9pbnQ=', 'Ym9keQ==', 'aW5pdGlhbFZhcmlhYmxlcw=='], locale: 'en' }}
        searchParams={{ header1: 'value1' }}
      />
    );
    expect(RestFull).toHaveBeenCalledWith(
      expect.objectContaining({
        initialVariables: 'aW5pdGlhbFZhcmlhYmxlcw==',
        method: 'GET',
        endpoint: 'ZW5kcG9pbnQ=',
        body: 'Ym9keQ==',
        headers: [{ key: 'header1', value: 'value1' }],
        locale: 'en',
        fetchData,
      }),
      {}
    );
  });
});
