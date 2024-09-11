import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ClientEndpointSdl from './ClientEndpointSdl';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ClientEndpointSdl component', () => {
  it('renders the input field correctly', () => {
    render(<ClientEndpointSdl value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText('RESTGraphQL:sdlEndpoint')).toBeInTheDocument();
  });

  it('displays the correct value in the input field', () => {
    const value = 'http://example.com';
    render(<ClientEndpointSdl value={value} onChange={() => {}} />);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = vi.fn();
    render(<ClientEndpointSdl value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('RESTGraphQL:sdlEndpoint');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('uses the correct translation for the placeholder', () => {
    render(<ClientEndpointSdl value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText('RESTGraphQL:sdlEndpoint')).toBeInTheDocument();
  });
});
