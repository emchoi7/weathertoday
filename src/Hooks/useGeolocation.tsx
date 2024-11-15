import {useState, useEffect} from 'react';

export function useGeolocation() {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.permissions
                .query({name:"geolocation"})
                .then(function (result) {
                if(result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError);
                } else {
                    setError("Permission denied for geolocation.");
                }
                });
        } else {
            setError("Geolocation is not supported.");
        }

        setIsLoading(false);

        const getCurrentPositionSuccess = (pos:GeolocationPosition) => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
        }

        const getCurrentPositionError = () => setError("Failed to get current coordinates.");

    }, []);

    return [latitude, longitude, error, isLoading];
}