import 'reflect-metadata';
import { fireEvent, render, screen } from '@testing-library/react';
import './core/useCases/registerUseCaseTest';
import App from './App';
import { authentication } from './core/useCases';

test('renders learn react link', () => {
  render(<App />);
  const email = screen.getByTestId('email');
  fireEvent.input(email, { target: { value: 'foo@bar.com' } })
  
  const password = screen.getByTestId('password');
  fireEvent.input(password, { target: { value: 'abc' } })
  
  const button = screen.getByRole('button')
  
  fireEvent.click(button);
  
  expect(authentication.login).toHaveBeenCalledTimes(1);
  expect(authentication.login).toHaveBeenCalledWith({ email: 'foo@bar.com', password: 'abc' })
});
