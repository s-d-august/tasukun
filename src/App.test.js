import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dialogue component', () => {
  render(<App />);
  expect(screen.getByText(/TEST/i)).toBeInTheDocument();
});
