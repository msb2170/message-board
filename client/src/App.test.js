import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders the landing page', () => {
  render(<App />);
  
  expect(screen.getByRole('title')).toHaveTextContent(/Programming Thoughts/);
  expect(screen.getByRole('title-text')).toHaveAttribute('placeholder', 'Enter a Post Title');
  expect(screen.getByRole('author-text')).toHaveAttribute('placeholder', 'Who are you?');
  expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Write your programming thought here...');
  expect(screen.getByRole('button')).toHaveTextContent(/Submit/i);
});
