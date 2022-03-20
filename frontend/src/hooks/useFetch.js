import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function useFetch(url, method, token) {
    /**
     * Usually we have 2 state variables that are data, error, and loading
     * created using useState to store the response data, error, and loading,
     * respectively.
     * 
     * If the data is recieved, we set it to the data variable. If
     * not, the error message will be set to the error variable.
     * 
     * Loader is initialized as false. When the API is called, it is set to true
     * so that a loader component can be loaded in the view.
     * 
     * At the end of the API call, this loader is set back to false by using the
     * finally block.
     */
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log('hook start')

    // For redirect on unauthorized error
    const navigate = useNavigate()
    /**
     * To make an API call, use a useEffect hook because it will trigger the API
     * call function inside it when rendered.
     * 
     * Need our async function inside the arrow function because useEffect
     * should only return nothing or a cleanup function. Async function returns
     * an implicit promise.
     * 
     * Async functions inside useEffect will trigger component updates after
     * every setState call. Synchronous functions insde useEffect won't. This is
     * because Async functions cause React not to batch the setStates properly.
     */
    useEffect(() => {
        /** Code to abort the fetch request
         *  When a fetch is aborted, its promise rejects with an error
         *  AbortError
         */ 
        const controller = new AbortController();
        const signal = controller.signal;
        let isApiSubscribed = true; // to prevent state updates

        const fetchData = async function(){
                try{
                    setLoading(true)
                    const response = await fetch(url, {
                        signal: signal,
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token 
                        }
                    })
                    const dataJSON = await response.json()
                    setData(dataJSON)
                }catch(err){
                    // only update state if fetch wasn't cancelled
                    if (isApiSubscribed) {
                        setLoading(false)
                        setError('Error') ///////////////// change to send the full error here
                    }
                }finally{
                    // only update state if fetch wasn't cancelled
                    if (isApiSubscribed) {
                        setLoading(false)
                    }
                }
        }
        fetchData();

        /** Cleanup function
         * Runs before component unmount and before the next scheduled effect
         * 
         * This specific instance of the cleanup function ensures that if we 
         * re-fetch the data before an older fetch finishes that the older fetch
         * is terminated. Also makes sure that a fetch is terminated before the
         * component unmounts to avoid an attempt to update an unmounted
         * component.
         */
        return () => {
            controller.abort();
            isApiSubscribed = false
        }
        
    }, [url, method, token]);

    // if (data !== null && data.hasOwnProperty('name') && data.name === 'TokenExpiredError') {
    //     console.log('redirect')
    //     navigate('/login')
    // } else {
    //     // note that error will only hold errors in the fetch function
    //     // data will have server side errors like unauthorized
    //     console.log('send back data')
    //     console.log(data)
        
    // }
    return { data, error, loading }
}