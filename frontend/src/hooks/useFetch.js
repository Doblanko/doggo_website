import { useEffect, useState } from "react";

export default function useFetch(url, method, header) {
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
    /**
     * To make an API call, use a useEffect hook because it will trigger the API
     * call function inside it when rendered.
     */
    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    console.log('Testing fetch')
                    //await setTimeout(() => console.log('waiting'), 5000)
                    const response = await fetch(url, {
                        method: method,
                        headers: header,
                    })
                    const dataJSON = await response.json()
                    setData(dataJSON)
                }catch(err){
                    setLoading(false)
                    setError('An error occurred')
                }finally{
                    setLoading(false)
                }
            }
        )() // immediately invoke the internal async function when use effect calls
        // the arrow function
    }, []);

    return { data, error, loading }
}