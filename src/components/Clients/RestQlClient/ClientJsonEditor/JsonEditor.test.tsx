import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import JsonEditor from './JsonEditor';

describe('JsonEditor component', () => {
  it('renders the component correctly', () => {
    render(<JsonEditor value="" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays an error message for invalid JSON', () => {
    render(<JsonEditor value="invalid json" />);

    fireEvent.blur(screen.getByRole('textbox'), {
      target: { textContent: 'invalid json' },
    });

    expect(screen.getByText(`Unexpected token 'i', "invalid json" is not valid JSON`)).toBeInTheDocument();
  });

  it('calls onChange with formatted JSON', () => {
    const handleChange = vi.fn();
    render(<JsonEditor value='{"key": "value"}' onChange={handleChange} />);

    fireEvent.blur(screen.getByRole('textbox'), {
      target: { textContent: '{"key": "value"}' },
    });

    expect(handleChange).toHaveBeenCalledWith('{\n  "key": "value"\n}');
  });

  it('displays the correct initial value', () => {
    const initialValue = '{"key": "value"}';
    render(<JsonEditor value={initialValue} />);

    expect(screen.getByRole('textbox')).toHaveTextContent(initialValue);
  });
});
