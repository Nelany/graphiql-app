import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { LSGetItem } from '../../../src/utils/LSHelpers';
import History from './page';

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({
    t: (key: string) => key,
  })),
}));
vi.mock('../../../src/components/NavButton/NavButton', () => ({
  NavButton: () => <button>Mocked NavButton</button>,
}));

vi.mock('../../../src/utils/LSHelpers', () => ({
  LSGetItem: vi.fn(),
}));

describe('History component', () => {
  it('renders the main container', () => {
    (LSGetItem as Mock).mockReturnValue([]);
    render(<History />);
    const mainElement = screen.getByRole('heading', { name: /History:tittle/i });
    expect(mainElement).toBeInTheDocument();
  });

  it('renders the history list when there is history', () => {
    const historyData = ['https://example.com', 'https://example2.com'];
    (LSGetItem as Mock).mockReturnValue(historyData);
    render(<History />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(historyData.length);
    historyData.forEach((url) => {
      expect(screen.getByText(url)).toBeInTheDocument();
    });
  });

  it('renders the empty history message and buttons when there is no history', () => {
    (LSGetItem as Mock).mockReturnValue([]);
    render(<History />);
    const emptyMessage = screen.getByText('History:historyEmpty');
    expect(emptyMessage).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
});
