 import { useAuthContext } from "./AuthProvider"
 import useFetch from "../hooks/useFetch"

 const Dashboard = () => {
     const { token } = useAuthContext();

     const { data, error, loading } = useFetch(
         'http://localhost:3000/users/protected',
         'GET',
         token,
         )

     return (
         <div>
            <h1> This is a protected component </h1>
            <p>Token is {token}</p>
            { loading && <p>Loading is { loading.toString() }</p>}
            { data && <p>Data is { data.msg }</p>}
            { error && <p>Error is {error}</p>}
         </div>
         
     )
 }

 export default Dashboard