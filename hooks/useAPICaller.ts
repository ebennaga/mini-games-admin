/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
import { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { useRouter } from 'next/router';
import useNotify from 'hooks/useNotify';
import useAuthReducer from './useAuthReducer';

const TIMEOUTLIMIT = 30000;

interface IAxiosConfig {
    endpoint: string;
    method?: string;
    data?: any;
    params?: any;
    headers?: any;
}

const useAPICaller = () => {
    const { user: userState } = useAuthReducer();
    const [isLoading, setisLoading] = useState<boolean>(false);
    const { setUser, clearUser } = useAuthReducer();
    const router = useRouter();
    const notify = useNotify();

    const axiosInstance = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: TIMEOUTLIMIT,
            validateStatus(status: number) {
                return status < StatusCodes.INTERNAL_SERVER_ERROR && status !== StatusCodes.FORBIDDEN;
            }
        };

        const instance = axios.create(axiosConfig);

        instance.interceptors.request.use((cfg: any) => {
            if (userState?.user?.api_token) {
                // eslint-disable-next-line no-param-reassign
                cfg.headers.Authorization = `Bearer ${userState?.user?.api_token}`;
            }
            return cfg;
        });

        return instance;
    };

    const service = (config: IAxiosConfig) => {
        const axiosService = axiosInstance();
        const apiConfig = {
            url: config.endpoint,
            method: config.method ? config.method : 'GET',
            data: config.data ? config.data : undefined,
            params: config.params ? config.params : undefined,
            headers: config.headers ? config.headers : undefined
        };
        return axiosService(apiConfig);
    };

    const fetchAPI = async (config: IAxiosConfig) => {
        setisLoading(true);
        let response = null;
        try {
            response = await service(config);
            setisLoading(false);
            return response;
        } catch (e: any) {
            setisLoading(false);
            if (e.response?.status === 403) {
                clearUser();
                router.push('/');
                notify('Your session is expired', 'error');
                // setUser(userState);
            }
            response = e.response;
            return response;
        }
    };

    return { fetchAPI, isLoading };
};

export default useAPICaller;
