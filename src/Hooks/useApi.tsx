import { useState, useCallback } from 'react';

export function useApi() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    async function defaultProcessResponse(res: Response) {
        return await res.json();
    }

    async function fetchApi (url: string, options: any, fetchFcn: Function = fetch, processResponse: Function = defaultProcessResponse) {
        setIsLoading(true);
        try {
            const response = await fetchFcn(url, options);
            const processedResponse = await processResponse(response);
            setData(processedResponse);
        } catch(err:any) {
            setError(err);
        }
        setIsLoading(false);
    }

    return [data, isLoading, error, fetchApi];
}

// const APIkey = process.env.REACT_APP_REVERSE_GEO_API_KEY;
// const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
// fetch(url)
// .then(res => res.json())
// .then(data => {
//   if(data.status.code === 200) {
//     let currLocation = data.results[0].formatted;
//     const locationStringArray = currLocation.split(',');
//     if(locationStringArray[locationStringArray.length - 1] === " United States of America") {
//         currLocation = locationStringArray.slice(2,4).join().split(' ').slice(1,3).join(' ');
//     } 
//     setLocationErr(false);
//     setLocation(currLocation);
//   } else {
//     throw new Error(data.status.code + ' Error');
//   }
// })
// .catch(error => {
//     setLocationErr(true);
//     setLocation(latitude + ", " + longitude);
// });