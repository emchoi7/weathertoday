import { useEffect, createContext } from 'react';

import './WeatherCard.css';

import HourlyCard from './HourlyCard';
import Location from './Location';

import { Oval } from 'react-loader-spinner';
import useWeatherData from '../Hooks/useWeatherData';
import useLocationData from '../Hooks/useLocationData';
import { useGeolocation } from '../Hooks/useGeolocation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export type HourlyTempObject = {
    time: Date;
    temp: number;
    preProb: number;
}

export const locationErrorContext = createContext(null);
export const weatherErrorContext = createContext(null);

export default function WeatherCard() {
    const [latitude, longitude, coordinatesError, isLoadingCoordinates] = useGeolocation();
    const [isLoadingLocation, locationError, location, fetchLocationData] = useLocationData();
    const [isLoadingWeather, weatherError, currentTemp, hourlyTemps, fetchWeatherData] = useWeatherData();

    useEffect(() => {
        if(latitude && longitude) {
            fetchLocationData(latitude, longitude);
            fetchWeatherData(latitude, longitude);
        }
    
    }, [latitude, longitude, fetchLocationData, fetchWeatherData]);

    let locationComponent = null;

    let bgColorClassName: string = "";

    if(isLoadingCoordinates || isLoadingLocation || isLoadingWeather) {
        return <div className="weather-card flex-column"><Oval
            visible={true}
            height="80"
            width="80"
            strokeWidth="8"
            color="white"
            secondaryColor="black"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        /></div>
    } else if(coordinatesError) {
        return <div className={"weather-card flex-column error"}><FontAwesomeIcon icon={faCircleExclamation} /><h3>{coordinatesError}</h3></div>
    }
        
    if(currentTemp && !bgColorClassName) {
        if (currentTemp < 40) {
            bgColorClassName = " cold";
        } else if (currentTemp < 55) {
            bgColorClassName = " cool";
        } else if (currentTemp < 70) {
            bgColorClassName = " room";
        }  else if (currentTemp < 85) {
            bgColorClassName = " warm";
        }  else if (currentTemp >= 85) {
            bgColorClassName = " hot";
        }
    }

    return <locationErrorContext.Provider value={locationError}>
        <weatherErrorContext.Provider value={weatherError}>
            <div className={"weather-card flex-column" + bgColorClassName}>
                <h3>{new Date(Date.now()).toUTCString().slice(0,11)}</h3>
                {locationComponent}
                <Location>{location ?? latitude + ", " + longitude}</Location>
                {weatherError ? <p className="error">{weatherError}</p> : <h1>{Math.round(currentTemp)}&deg;</h1>}
                <HourlyCard hourlyTemps={hourlyTemps} />
            </div>
        </weatherErrorContext.Provider>
    </locationErrorContext.Provider>
}