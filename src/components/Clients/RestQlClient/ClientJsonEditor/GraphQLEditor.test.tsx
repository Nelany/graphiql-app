import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import graph from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { describe, expect, it, Mock, vi } from 'vitest';
import GraphEditor from './GraphQLEditor';

vi.mock('@codemirror/lang-javascript', () => ({
  javascript: vi.fn(),
}));

vi.mock('@uiw/codemirror-theme-material', () => ({
  material: vi.fn(),
}));

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(({ value, onChange }) => <textarea value={value} onChange={(e) => onChange(e.target.value)} />),
}));

vi.mock('prettier/standalone', () => ({
  __esModule: true,
  default: { format: vi.fn() },
}));

vi.mock('prettier/plugins/graphql', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('GraphEditor component', () => {
  it('renders the editor with initial state', () => {
    render(<GraphEditor value="initial value" />);

    expect(screen.getByText('initial value')).toBeInTheDocument();
  });

  it('handles value change and formatting', async () => {
    const mockOnChange = vi.fn();
    (prettier.format as Mock).mockResolvedValue('formatted value');

    render(<GraphEditor value="initial value" onChange={mockOnChange} />);

    const editor = screen.getByText('initial value');
    fireEvent.change(editor, { target: { value: 'new value' } });

    await waitFor(() => {
      expect(prettier.format).toHaveBeenCalledWith('new value', {
        parser: 'graphql',
        plugins: [graph],
      });
      expect(screen.getByText('formatted value')).toBeInTheDocument();
    });
  });

  it('displays error message on invalid GraphQL format', async () => {
    (prettier.format as Mock).mockImplementation(() => {
      throw new Error('Invalid GraphQL');
    });

    render(<GraphEditor value="initial value" />);

    const editor = screen.getByText('initial value');
    fireEvent.change(editor, { target: { value: 'invalid graphql' } });

    await waitFor(() => {
      expect(screen.getByText('Invalid GraphQL')).toBeInTheDocument();
    });
  });
});
