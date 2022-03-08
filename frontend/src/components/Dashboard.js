 import { useAuthContext } from "./AuthProvider"
 import { useFetch } from "../hooks/useFetch"
 const Dashboard = () => {
     const { token } = useAuthContext();

     const { data, error, loading } = useFetch


     return (
         <div>
            <h1> This is a protected component </h1>
            <p>Token is {token}</p>
         </div>
         
     )
 }

 export default Dashboard