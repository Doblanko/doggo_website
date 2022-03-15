import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import Login from './components/Login';
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";



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
  return (
    <AuthProvider>
      <NavBar/>
        <div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            {
            /** Protected Routes
             * the Dashboard component should only be accessible for
             * authenticated users. Therefore the ProtectedRoute componenet is
             * wrapped around itmalicious user could still modify the client-side
             * code in the browser (e.g. removing the condition to redirect from
             * the ProtectedRoute). Therefore, all sensitive API calls that
             * happen on protected pages (e.g. Dashboard page) need to be secured
             * from the server-side too.
             */ 
            }
            <Route
              path='dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              />
            { /* default case if nothing matches */ }
            <Route path='*' element={<NoMatch />}/>
          </Routes>
        </div>
    </AuthProvider>
      
  );
}

export default App;
