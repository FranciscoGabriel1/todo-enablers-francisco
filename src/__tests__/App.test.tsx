import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

const spyGet = jest.spyOn(Storage.prototype, 'getItem');
const spySet = jest.spyOn(Storage.prototype, 'setItem');

beforeEach(() => {
  spyGet.mockReturnValue(null); 
  spySet.mockClear();
});

describe('<App /> integração', () => {
  it('cria tarefa, exibe na lista e grava no localStorage', async () => {
    render(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/adicione uma tarefa/i),
      'Nova tarefa'
    );
    await userEvent.click(screen.getByRole('button', { name: /criar/i }));

    expect(screen.getAllByRole('checkbox')).toHaveLength(3);

    expect(screen.getByText('Nova tarefa')).toBeInTheDocument();

    expect(screen.getByText(/^3$/)).toBeInTheDocument();

    expect(spySet).toHaveBeenCalledWith(
      'todo-ts/tasks',
      expect.stringContaining('Nova tarefa')
    );
  });
});
