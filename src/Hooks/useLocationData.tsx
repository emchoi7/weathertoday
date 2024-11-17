import {useState, useEffect, useCallback} from 'react';
import { useApi } from "./useApi";

export default function useLocationData() {
    const [data, isLoading, error, setError, fetchApi] = useApi();
    const [location, setLocation] = useState<string>();

    useEffect(() => {
        if(data) {
            let currLocation: string;
            if(data.status.code === 200) {
                currLocation = data.results[0].formatted;
                const locationStringArray = currLocation.split(',');
                if(locationStringArray[locationStringArray.length - 1] === " United States of America") {
                    currLocation = locationStringArray.slice(2,4).join().split(' ').slice(1,3).join(' ');
                }
                setLocation(currLocation);
            } else {
                setError(data.status.message);
            }
        }
    }, [data, setError]);

    const fetchLocationData = useCallback((latitude: number, longitude: number) => {
        const APIkey = process.env.REACT_APP_REVERSE_GEO_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
        fetchApi(url, {});
    }, [fetchApi]);

    return [isLoading, error, location, fetchLocationData];
}