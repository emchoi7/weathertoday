
import './App.css';
import { useEffect, useState } from 'react';
import WeatherCard from './Components/WeatherCard';

import { fetchWeatherApi } from 'openmeteo';


function App() {
  
  return (
    <WeatherCard />
  );
}

export default App;
