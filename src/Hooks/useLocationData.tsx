import {useState, useEffect, useCallback} from 'react';
import { useApi } from "./useApi";

export default function useLocationData() {
    const [data, isLoading, error, setError, fetchApi] = useApi();
    const [location, setLocation] = useState<string>();

    useEffect(() => {
        if(data) {
            if(data.status.code === 200) {
                const currCity = data.results[0].components.city;
                const currState = data.results[0].components.state_code;
                setLocation(currCity + ", " + currState);
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