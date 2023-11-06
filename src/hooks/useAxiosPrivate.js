import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useAxiosPrivate = () => {
    //const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                
                const prevRequest = error?.config;
                debugger;
                <ToastContainer pauseOnFocusLoss={false} />

// Opt-out per toast
toast('Hello', {
  pauseOnFocusLoss: false
})
                toast.info(error.response.data.errors[0].message);
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    //const newAccessToken = await refresh();
                    //prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                //return Promise.reject(error);
                return () => {
                    <ToastContainer pauseOnFocusLoss={false} />

                    // Opt-out per toast
                    toast('Hello', {
                      pauseOnFocusLoss: false
                    });
                    Promise.reject(error);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    //}, [auth, refresh])
}, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate;


