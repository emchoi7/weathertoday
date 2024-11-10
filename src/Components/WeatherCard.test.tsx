import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

test('renders loading oval', () => {
    render(<WeatherCard />);
    const loadingElement = screen.getByLabelText("oval-loading");
    expect(loadingElement).toBeInTheDocument();
});