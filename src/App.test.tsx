import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WeatherCard\'s loading oval', () => {
    render(<App />);
    const loadingElement = screen.getByLabelText("oval-loading");
    expect(loadingElement).toBeInTheDocument();
});