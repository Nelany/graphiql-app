import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResponseBody from './ResponseBody';

describe('ResponseBody component', () => {
  it('renders the component correctly', () => {
    render(<ResponseBody body="Test Body" />);

    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });

  it('displays the correct body text', () => {
    const bodyText = 'This is a response body';
    render(<ResponseBody body={bodyText} />);

    expect(screen.getByText(bodyText)).toBeInTheDocument();
  });
});
