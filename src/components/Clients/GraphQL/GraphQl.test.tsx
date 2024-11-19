import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GraphQL from './GraphQl';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
}

interface ResponseStatusProps {
  status: number;
  statusText: string;
}

interface KeyValueInputsProps {
  value: { key: string; value: string }[];
  onRemove: (index: number) => void;
}

vi.mock('../../../../app/actions', () => ({
  fetchSDL: vi.fn(),
}));

vi.mock('@/utils/LSHelpers', () => ({
  LSGetItem: vi.fn(),
  LSSetItem: vi.fn(),
}));

vi.mock('../RestQlClient/ClientEndpoint/ClientEndpoint', () => ({
  __esModule: true,
  default: (props: InputProps) => <input value={props.value} onChange={(e) => props.onChange(e.target.value)} />,
}));

vi.mock('../RestQlClient/ClientEndpointSdl/ClientEndpointSdl', () => ({
  __esModule: true,
  default: (props: InputProps) => <input value={props.value} onChange={(e) => props.onChange(e.target.value)} />,
}));

vi.mock('../RestQlClient/ClientJsonEditor/GraphQLEditor', () => ({
  __esModule: true,
  default: (props: TextAreaProps) => <textarea value={props.value} onChange={(e) => props.onChange(e.target.value)} />,
}));

vi.mock('../RestQlClient/ClientJsonEditor/JsonEditor', () => ({
  __esModule: true,
  default: (props: TextAreaProps) => (
    <textarea value={props.value} onChange={(e) => props.onChange(e.target.value)} readOnly={props.isReadOnly} />
  ),
}));

vi.mock('../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus', () => ({
  __esModule: true,
  default: (props: ResponseStatusProps) => (
    <div>
      {props.status} {props.statusText}
    </div>
  ),
}));

vi.mock('../RestQlClient/GraphQLDocs/GraphQLDocs', () => ({
  __esModule: true,
  default: () => <div>Mocked GraphQLDocs</div>,
}));

vi.mock('../RestQlClient/KeyValueInputs/KeyValueInputs', () => ({
  __esModule: true,
  default: (props: KeyValueInputsProps) => (
    <div>
      {props.value.map((header, index) => (
        <div key={index}>
          <span>
            {header.key}: {header.value}
          </span>
          <button onClick={() => props.onRemove(index)}>Remove</button>
        </div>
      ))}
    </div>
  ),
}));

describe('GraphQL component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const defaultProps = {
    initialVariables: '{}',
    method: 'POST',
    endpoint: 'http://example.com/graphql',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: '{}',
    locale: 'en',
    fetchData: vi.fn().mockResolvedValue({
      response: { data: 'test' },
      status: 200,
      statusText: 'OK',
    }),
  };

  it('renders the main container with initial state', async () => {
    await act(async () => {
      render(<GraphQL {...defaultProps} />);
    });

    expect(screen.getByRole('img', { name: /list-icon/i })).toBeInTheDocument();
    expect(screen.queryAllByText('RESTGraphQL:send').length).toBeGreaterThan(0);
    expect(screen.getByText('RESTGraphQL:urlSdl')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:body')).toBeInTheDocument();
    expect(screen.getByText('RESTGraphQL:response')).toBeInTheDocument();
  });

  it('handles sending request and updating response', async () => {
    defaultProps.fetchData = vi.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK',
      data: { data: 'test' },
    });

    await act(async () => {
      render(<GraphQL {...defaultProps} />);
    });

    const sendButton = screen.getAllByText('RESTGraphQL:send')[0];
    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(defaultProps.fetchData).toHaveBeenCalled();
    expect(screen.getByText('200 OK')).toBeInTheDocument();
  });

  it('handles showing and hiding headers', async () => {
    await act(async () => {
      render(<GraphQL {...defaultProps} />);
    });

    const showHeadersButton = screen.getByText('RESTGraphQL:showHeaders');
    await act(async () => {
      fireEvent.click(showHeadersButton);
    });

    expect(screen.getByText('Content-Type: application/json')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(showHeadersButton);
    });

    expect(screen.queryByText('Content-Type: application/json')).not.toBeInTheDocument();
  });

  it('handles showing and hiding variables', async () => {
    await act(async () => {
      render(<GraphQL {...defaultProps} />);
    });

    const showVariablesButton = screen.getByText('RESTGraphQL:showVariables');
    await act(async () => {
      fireEvent.click(showVariablesButton);
    });

    expect(screen.getAllByDisplayValue('{}').length).toBeGreaterThan(1);

    await act(async () => {
      fireEvent.click(showVariablesButton);
    });

    expect(screen.queryAllByDisplayValue('{}').length).toBe(1);
  });
});
