import React, {useState, useEffect, useRef, RefObject} from 'react';
import { fetchWeatherApi } from 'openmeteo';
import { useApi } from '../Hooks/useApi';

import './WeatherCard.css';

import HourlyCard from './HourlyCard';
import Location from './Location';

import { Oval } from 'react-loader-spinner';

export type HourlyTempObject = {
    time: Date;
    temp: number;
    preProb: number;
}

export default function WeatherCard() {
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [hourlyTemps, setHourlyTemps] = useState<Array<HourlyTempObject> | null>(null);

    // const [locationErr, setLocationErr] = useState<Boolean>(false);
    const [location, setLocation] = useState<String | null>(null);

    const [locationRes, isLoadingLocation, locationErr, fetchLocation] = useApi();
    const [weatherRes, isLoadingWeather, weatherErr, fetchWeather] = useApi();

    const coordsRef = useRef<GeolocationCoordinates>();

    const currDate = new Date(Date.now());

    useEffect(() => {
        if(navigator.geolocation) {
        navigator.permissions
            .query({name:"geolocation"})
            .then(function (result) {
            if(result.state === "granted") {
                navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess);
            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess);
            } 
            });
        } 
    }), [];

    // TODO: geolocation error callback

    async function getCurrentPositionSuccess(pos: GeolocationPosition) {
        coordsRef.current = pos.coords;
        await setCurrentLocation(pos.coords.latitude, pos.coords.longitude);
        await getWeatherInformation(pos.coords.latitude, pos.coords.longitude);
    }

    async function setCurrentLocation(latitude: number, longitude: number) {
        const APIkey = process.env.REACT_APP_REVERSE_GEO_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetchLocation(url, {});
    }

    async function getWeatherInformation(latitude: number, longitude: number) {
        const params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m",
            "hourly": ["temperature_2m", "precipitation_probability"],
            "temperature_unit": "fahrenheit",
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        fetchWeather(url, params, fetchWeatherApi);
    }

    let bgColorClassName: string = "";

    if(currentTemp) {
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

    let locationComponent;

    if(locationRes) {
        console.log(locationRes)
        const data = locationRes.result;
        let currLocation: string = "";
        if(data.status.code === 200) {
            currLocation = data.results[0].formatted;
            const locationStringArray = currLocation.split(',');
            if(locationStringArray[locationStringArray.length - 1] === " United States of America") {
                currLocation = locationStringArray.slice(2,4).join().split(' ').slice(1,3).join(' ');
            }
            locationComponent = <Location err={false}>{currLocation}</Location>
        } else {
            locationComponent = <Location err={true}>{coordsRef.current?.latitude + ", " + coordsRef.current?.longitude}</Location>
        }
    } else if(locationErr) {
        locationComponent = <Location err={true}>""</Location>
    }

    let currTempComponent;
    let hourlyCardComponent;

    if(weatherRes) {
        const response = weatherRes[0];
    
        const utcOffsetSeconds = response.utcOffsetSeconds();
    
        const current = response.current();
        const hourly = response.hourly();

        const newCurrentTemp = current?.variables(0)!.value() ?? 0;
        currTempComponent = <h1>{currentTemp}&deg;</h1>;
    
        const range = (start: number, end: number, step: number) => Array.from({length: (end - start) / step}, (_,i) => start + i * step);
        const hourlyTime = range(Number(hourly?.time()), Number(hourly?.timeEnd()), Number(hourly?.interval())).map(t => new Date((t + utcOffsetSeconds) * 1000));
        const hourlyTemps = hourly?.variables(0)!.valuesArray()!;
        const hourlyPreProbs = hourly?.variables(1)!.valuesArray()!;
        
        let newHourlyTemps: Array<HourlyTempObject> = [];

        for(let i = 0; i <= hourlyTime.length; i++) {
            if( hourlyTime[i]
                && hourlyTime[i].getFullYear() === currDate.getFullYear() 
                && hourlyTime[i].getMonth() === currDate.getMonth() 
                && hourlyTime[i].getDate() === currDate.getDate())
            newHourlyTemps.push({
                time: hourlyTime[i],
                temp: hourlyTemps[i],
                preProb: hourlyPreProbs[i]
            });
        }

        hourlyCardComponent = <HourlyCard hourlyTemps={hourlyTemps} error={false}/>;
    } else if (weatherErr) {
        currTempComponent = <h2 className="error">There was an error fetching weather data.</h2>;
        hourlyCardComponent = <HourlyCard hourlyTemps={[]} error />
    }

    return <div className={"weather-card flex-column" + bgColorClassName}>
        
        {currentTemp && location && hourlyTemps 
            ? <div>
                <h3>{currDate.toUTCString().slice(0,11)}</h3>
                {locationComponent}
                {currTempComponent}
                {hourlyCardComponent}
            </div>
            : <Oval
                visible={true}
                height="80"
                width="80"
                strokeWidth="8"
                color="white"
                secondaryColor="black"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />}

    </div>
}