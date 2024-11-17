import {useState, useEffect} from 'react';
import { useApi } from "./useApi";
import { HourlyTempObject } from "../Components/WeatherCard";

export default function useWeatherData() {
    const [data, isLoading, error, setError, fetchApi] = useApi();
    const [currentTemp, setCurrentTemp] = useState<number>();
    const [hourlyTemps, sethourlyTemps] = useState<HourlyTempObject[]>();

    const currDate = new Date(Date.now());

    useEffect(() => {
        if(data) {
            setCurrentTemp(data.current().variables(0).value());

            const utcOffsetSeconds: number = data.utcOffsetSeconds();

            const hourly = data.hourly();
            const range = (start: number, end: number, step: number) => Array.from({length: (end - start) / step}, (_,i) => start + i * step);

            const hourlyTime: Date[] = range(Number(hourly?.time()), Number(hourly?.timeEnd()), Number(hourly?.interval())).map(t => new Date((t + utcOffsetSeconds) * 1000));
            const hourlyTemps: Float32Array = hourly?.variables(0)!.valuesArray()!;
            const hourlyPreProbs: Float32Array = hourly?.variables(1)!.valuesArray()!;
            
            let newHourlyTemps: HourlyTempObject[] = [];
            // for(let i = 0; i < hourlyTime.length; i++) {
            //     if(hourlyTime 
            //         && hourlyTime[i].getDate() === currDate.getDate()
            //     )
            //     newHourlyTemps.push({
            //             time: hourlyTime[i],
            //             temp: hourlyTemps[i],
            //             preProb: hourlyPreProbs[i]
            //     });
            // }
            /*
            * The api returns the 0th hour of the day that GMT+0 is on
            * Find the day that user's system is on, find the 0th hour of that day
            * Return 24 hours from there
            */
           for(let i = 0; i < hourlyTime.length; i++) {
                if(hourlyTime
                    && hourlyTime[i].getDate() === currDate.getDate()
                ) {
                    for(let j = i; j < i+24; j++) {
                        newHourlyTemps.push({
                            time: hourlyTime[j],
                            temp: hourlyTemps[j],
                            preProb: hourlyPreProbs[j]
                        });
                    }
                    break;
                }
            }
            sethourlyTemps(newHourlyTemps);
        }
    }, [data]);

    return [isLoading, error, fetchApi, currentTemp, hourlyTemps];
}