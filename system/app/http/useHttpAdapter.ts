import { useCallback, useState } from "react";
import HttpAdapter from "./base-adapter";

export default function useHttpAdapter<PayloadType, ParamsType>(adapter: HttpAdapter) {

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<any | null>();
    const [data, setData] = useState<any | null>();

    const execute = useCallback(async (options: {
        payload?: PayloadType;
        params?: ParamsType;
        onSuccess?: (data: any) => void;
        onFailed?: () => void;
    }) => {
        setLoading(true);
        setError(null);
        setResponse(null);
        setData(null);

        if (adapter.method === 'POST' && !options.payload) {
            throw new Error('Payload is required for POST requests');
        }

        if (options.params) {
            adapter.parseUrlWith(options?.params);
        }

        let response: any;

        try {
            if (adapter.method === 'GET') {
                response = await fetch(adapter.url);
            }
            else {
                response = await fetch(adapter.url, {
                    method: adapter.method,
                    body: JSON.stringify(options?.payload),
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            setResponse(response);

            if (response.ok) {
                const data = await response.json();
                setData(data.data);
                if (options.onSuccess) options.onSuccess(data);
                return data;
            }
            else {
                const error = await response.json();
                setError(error);
                if (options.onFailed) options.onFailed();
            }
        } catch (error: any) {
            setError(error.message);
            if (options.onFailed) options.onFailed();
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adapter]);

    return {
        loading, data, error, response, execute
    };
}