import { Navigate } from "react-router-dom";
import useToken from "./useToken";

const App = () => {

  // destructure
  const { token } = useToken()
  if (!token) {
    return <Navigate replace to='/login'/>
  }
  return (
    <div>
      <h1>Main App</h1>
    </div>
  );
}

export default App;
