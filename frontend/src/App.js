import useToken from "./useToken";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const { token, setToken } = useToken()
    if(!token) {
      return (
        <Navigate replace to='/login'/> 
      )
    }
  return (
    <div>
      <h1>Main App</h1>
    </div>
  );
}

export default App;
