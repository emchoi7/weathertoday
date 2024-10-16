import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

test('renders date', () => {
    render(<WeatherCard />);
    const headerElement = screen.getByText(/Wednesday, Oct 16/i);
    expect(headerElement).toBeInTheDocument();
});