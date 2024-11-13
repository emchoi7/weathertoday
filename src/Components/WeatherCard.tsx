import React, {useState, useEffect} from 'react';
import { fetchWeatherApi } from 'openmeteo';

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

    const [locationErr, setLocationErr] = useState<Boolean>(false);
    const [location, setLocation] = useState<String | null>(null);

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
    });

    async function getCurrentPositionSuccess(pos: GeolocationPosition) {
        await setCurrentLocation(pos.coords.latitude, pos.coords.longitude);
        await getWeatherInformation(pos.coords.latitude, pos.coords.longitude);
    }

    async function setCurrentLocation(latitude: number, longitude: number) {
        const APIkey = process.env.REACT_APP_REVERSE_GEO_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
          if(data.status.code === 200) {
            let currLocation = data.results[0].formatted;
            const locationStringArray = currLocation.split(',');
            if(locationStringArray[locationStringArray.length - 1] === " United States of America") {
                currLocation = locationStringArray.slice(2,4).join().split(' ').slice(1,3).join(' ');
            } 
            setLocationErr(false);
            setLocation(currLocation);
          } else {
            throw new Error(data.status.code + ' Error');
          }
        })
        .catch(error => {
            setLocationErr(true);
            setLocation(latitude + ", " + longitude);
        });
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
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
    
        const utcOffsetSeconds = response.utcOffsetSeconds();
    
        const current = response.current();
        const hourly = response.hourly();

        const newCurrentTemp = current?.variables(0)!.value() ?? 0;
    
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

        setCurrentTemp(Math.round(newCurrentTemp));
        setHourlyTemps(newHourlyTemps);
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

    return <div className={"weather-card flex-column" + bgColorClassName}>
        
        {currentTemp && location && hourlyTemps 
            ? <div>
                    <h3>{currDate.toUTCString().slice(0,11)}</h3>
                    <Location err={locationErr}>{location}</Location>
                    <h1>{currentTemp}&deg;</h1>
                    <HourlyCard hourlyTemps={hourlyTemps}/></div>
                
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