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

    console.log('hook')

    // For redirect on unauthorized error
    const navigate = useNavigate()
    /**
     * To make an API call, use a useEffect hook because it will trigger the API
     * call function inside it when rendered.
     * 
     * Need our async function inside the arrow function because useEffect
     * should only return nothing or a cleanup function. Async function returns
     * an implicit promise.
     */
    useEffect(() => {
        console.log('useeffect')

        let isApiSubscribed = true;

        const fetchData = async function(){
                try{
                    console.log('data json1')
                    setLoading(true)
                    console.log('data json2')
                    console.log('data json 3')
                    const response = await fetch(url, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token 
                        }
                    })
                    console.log('fetched')
                    if(isApiSubscribed) {
                        const dataJSON = await response.json()
                        setData(dataJSON)
                    }
                }catch(err){
                    console.log(err)
                    setLoading(false)
                    setError('Error') ///////////////// change to send the full error here
                }finally{
                    console.log('finally')
                    setLoading(false)
                }
        }
        
        fetchData();

        /** Cleanup function
         * Runs before component unmount and before the next scheduled effect
         */
        return () => {
            console.log('cleanup')
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
    console.log('return')
    return { data, error, loading }
}