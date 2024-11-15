import { useState, useCallback } from 'react';

export function useApi() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<any>(null);

    async function defaultProcessResponse(res: Response) {
        return await res.json();
    }

    const fetchApi = useCallback(async (url: string, options: any, fetchFcn: Function = fetch, processResponse: Function = defaultProcessResponse) => {
        setIsLoading(true);
        try {
            const response = await fetchFcn(url, options);
            const processedResponse = await processResponse(response);
            setData(processedResponse);
        } catch(err:any) {
            setError(err);
        }
        setIsLoading(false);
    }, []);

    return [data, isLoading, error, setError, fetchApi];
}