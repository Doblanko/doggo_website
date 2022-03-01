import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './login';

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

const RouteSwitch = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;