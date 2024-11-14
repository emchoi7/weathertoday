import { useState, useCallback } from 'react';

export function useApi() {
    const [res, setRes] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    async function fetchApi (url: string, options: any, fetchFcn: Function = fetch) {
        setIsLoading(true);
        try {
            let response = await fetchFcn(url, options);
            // if(fetchFcn == fetch) {
            //     response = response.json();
            // }
            setRes(response.data);
        } catch(err:any) {
            setError(err);
        }
        setIsLoading(false);
    }

    return [res, isLoading, error, fetchApi];
}