import { useState, useCallback } from 'react';

export function useApi() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    function defaultProcessResponse(res: Response) {
        return res.json();
    }

    async function fetchApi (url: string, options: any, fetchFcn: Function = fetch, processResponse: Function = defaultProcessResponse) {
        setIsLoading(true);
        try {
            let response = await fetchFcn(url, options);
            setData(processResponse(response));
        } catch(err:any) {
            setError(err);
        }
        setIsLoading(false);
    }

    return [data, isLoading, error, fetchApi];
}