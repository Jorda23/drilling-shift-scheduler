import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigForm } from '../ConfigForm';

describe('ConfigForm', () => {
  it('renders all input fields', () => {
    render(<ConfigForm onCalculate={jest.fn()} />);

    expect(
      screen.getByLabelText(/Días trabajo \(N\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Días descanso \(M\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Días inducción/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Total días perforación/i)
    ).toBeInTheDocument();
  });

  it('calls onCalculate when button is clicked', () => {
    const onCalculate = jest.fn();

    render(<ConfigForm onCalculate={onCalculate} />);

    const button = screen.getByRole('button', {
      name: /calcular cronograma/i,
    });

    fireEvent.click(button);

    expect(onCalculate).toHaveBeenCalledTimes(1);
  });
});
