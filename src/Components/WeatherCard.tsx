import { useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

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

export default function WeatherCard() {
    const [latitude, longitude, coordinatesError, isLoadingCoordinates] = useGeolocation();
    const [isLoadingLocation, locationError, fetchLocation, location] = useLocationData();
    const [isLoadingWeather, weatherError, fetchWeather, currentTemp, hourlyTemps] = useWeatherData();

    const currDate = new Date(Date.now());

    useEffect(() => {
        if(latitude && longitude) {
            const APIkey = process.env.REACT_APP_REVERSE_GEO_API_KEY;
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
            fetchLocation(url, {});
        }
    
    }, [latitude, longitude, fetchLocation]);

    useEffect(() => {
        if(latitude && longitude) {
            let params = {
                "latitude": latitude,
                "longitude": longitude,
                "current": "temperature_2m",
                "hourly": ["temperature_2m", "precipitation_probability"],
                "temperature_unit": "fahrenheit",
                "past_days": 0
            };
            if(currDate.getDate() !== currDate.getUTCDate()) {
                params["past_days"] = 1;
            }
            const url = "https://api.open-meteo.com/v1/forecast";
            fetchWeather(url, params, fetchWeatherApi, (res:any) => Promise.resolve(res[0]));
        }
    }, [latitude, longitude, fetchWeather]);

    let locationComponent = null;

    let bgColorClassName: string = "";
    let currTempComponent = null;
    let hourlyCardComponent = null;

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
    } else {
        if(!locationComponent) {
            if (!location) {
                if (locationError) {
                    locationComponent = <Location err={locationError}>{latitude + ", " + longitude}</Location>
                }
            } else {
                locationComponent = <Location err={null}>{location}</Location>
            }
        }
        
        if(!currTempComponent  && !hourlyCardComponent) {
            if (!currentTemp || !hourlyTemps) {
                if (weatherError) {
                    currTempComponent = <h2 className="error">{weatherError}</h2>;
                    hourlyCardComponent = <HourlyCard hourlyTemps={[]} error />
                }
            } else {
                currTempComponent = <h1>{Math.round(currentTemp)}&deg;</h1>;
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
                hourlyCardComponent = <HourlyCard hourlyTemps={hourlyTemps} error={false}/>;
            }
        }
    }
    

    return <div className={"weather-card flex-column" + bgColorClassName}>
        <h3>{currDate.toUTCString().slice(0,11)}</h3>
        {locationComponent}
        {currTempComponent}
        {hourlyCardComponent}
    </div>
}