import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Task } from '..';

describe('<Task />', () => {
  const baseProps = {
    id: '123',
    title: 'Minha tarefa',
    checked: false,
    onComplete: jest.fn(),
    onDelete: jest.fn()
  };

  it('exibe o título e o checkbox não marcado', () => {
    render(<Task {...baseProps} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('dispara onComplete quando o checkbox é clicado', async () => {
    render(<Task {...baseProps} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(baseProps.onComplete).toHaveBeenCalledWith(baseProps.id);
  });

  it('dispara onDelete quando o botão de lixeira é clicado', async () => {
    render(<Task {...baseProps} />);
    await userEvent.click(screen.getByLabelText(/remove task/i));
    expect(baseProps.onDelete).toHaveBeenCalledWith(baseProps.id);
  });
});
