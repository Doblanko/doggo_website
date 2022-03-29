import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

    /** Smart redirect
     * 'Remember' the location from where the redirect happened to the login
     * page. This useLocation hook grabs the current location before we redirect
     * the user.
     */
     const location = useLocation();
     const navigate = useNavigate();

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
         *  "AbortError"
         */ 
        const controller = new AbortController();
        const signal = controller.signal;

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

                    /**
                     * Catch the unauthorized error that would be hidden in the
                     * response variable and send to error handling.
                     */
                    if (dataJSON.message === 'jwt expired') {
                        throw new Error('unauthorized')
                    }
                    setData(dataJSON)
                }catch(err){
                    /** Error handling
                     * First handler is for jwt expired and unauthorized
                     * 
                     * Need to separate out AbortError because if the fetch was
                     * aborted the component was unmounted and we can't update
                     * the error and loading state.
                     */
                    if (err.message === 'unauthorized') {
                        setLoading(false);
                        // redirect to login screen
                        navigate('/login',
                            { 
                              replace: true, 
                              state: { from: location } 
                            }
                        )
                    } else if (err.name === 'AbortError') {
                        console.log('Abort Error')
                    } else {
                        setLoading(false)
                        setError(err)
                    }
                }finally{
                    setLoading(false)
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
        }
        
    }, [url, method, token, location , navigate]);

    return { data, error, loading }
}