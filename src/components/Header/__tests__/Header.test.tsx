import { render, screen } from '@testing-library/react';
import { Header } from '..';

describe('<Header />', () => {
  it('exibe o logo com alt="todo"', () => {
    render(<Header />);
    expect(screen.getByAltText(/todo/i)).toBeInTheDocument();
  });
});
