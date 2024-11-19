import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RestFull from './RESTfull';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(({ value, onChange }) => <textarea value={value} onChange={(e) => onChange(e.target.value)} />),
}));

const defaultProps = {
  fetchData: vi.fn(),
  method: 'GET',
  endpoint: 'http://example.com',
  headers: [{ key: 'Content-Type', value: 'application/json' }],
  body: '{"query": "{ hello }"}',
  locale: 'en',
  initialVariables: '[{"key": "var1", "value": "value1"}]',
};

describe('RestFull component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the main container with initial state', async () => {
    await act(async () => {
      render(<RestFull {...defaultProps} />);
    });

    expect(screen.getByText('RESTGraphQL:send')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:showHeaders')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:showVariables')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:body')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:response')).toBeInTheDocument();
  });

  it('handles sending request and updating response', async () => {
    defaultProps.fetchData.mockResolvedValue({
      response: { data: 'test' },
      status: 200,
      statusText: 'OK',
    });

    await act(async () => {
      render(<RestFull {...defaultProps} />);
    });

    const sendButton = screen.getByText('RESTGraphQL:send');
    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(defaultProps.fetchData).toHaveBeenCalled();
    expect(screen.getByText('OK.')).toBeInTheDocument();
  });

  it('handles showing and hiding headers', async () => {
    await act(async () => {
      render(<RestFull {...defaultProps} />);
    });

    const showHeadersButton = screen.getByText('RESTGraphQL:showHeaders');
    await act(async () => {
      fireEvent.click(showHeadersButton);
    });

    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(showHeadersButton);
    });

    expect(screen.queryByDisplayValue('application/json')).not.toBeInTheDocument();
  });

  it('handles showing and hiding variables', async () => {
    await act(async () => {
      render(<RestFull {...defaultProps} />);
    });

    const showVariablesButton = screen.getByText('RESTGraphQL:showVariables');
    await act(async () => {
      fireEvent.click(showVariablesButton);
    });

    expect(screen.getByDisplayValue('value1')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(showVariablesButton);
    });

    expect(screen.queryByDisplayValue('value1')).not.toBeInTheDocument();
  });
});
