import {useState, useEffect} from 'react';
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

    return [isLoading, error, fetchApi, location];
}