import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders date', () => {
  render(<App />);
  const headerElement = screen.getByText(/Wednesday, Oct 16/i);
  expect(headerElement).toBeInTheDocument();
});