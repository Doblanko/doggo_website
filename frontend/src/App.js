import { Route, Routes, Navigate } from "react-router-dom";
import Login from './login';
import useToken from './useToken';

/** Route Explanation
 * Route: Those are our routes with a path, which equals the url path, and a component
 * that should be rendered when we navigate to this url.
 * 
 * BrowserRouter: Is a router, which uses the history API (pushState, replaceState and the
 * popstate event) to keep your UI in sync with the URL. For completion we have to mention
 * that there are other options than BrowserRouter, but for your current projects you can
 * assume that BrowserRouter is at the root of all your projects.
 * 
 * Routes: Renders the first child Route that matches the location. In other words, the Routes
 * component is going to look through all your Routes and checks their path. The first Route,
 * whose path matches the url exactly will be rendered; all others will be ignored. Important to
 * note is that in previous versions of react-router-dom the exact keyword was needed to achieve
 * this behavior.
 * 
 */

const App = () => {
  // destructure
  const { token, setToken } = useToken()
  if (!token) {
    return <Navigate replace to='/login'/>
  }
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
