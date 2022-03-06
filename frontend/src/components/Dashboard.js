 import { useAuthContext } from "./AuthProvider"
 const Dashboard = () => {
     const { token } = useAuthContext();
    

     return (
         <div>
            <h1> This is a protected component </h1>
            <p>Token is {token}</p>
         </div>
         
     )
 }

 export default Dashboard