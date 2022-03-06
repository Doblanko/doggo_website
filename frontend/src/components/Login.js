import React, { useState } from 'react';
import { useNavigate, useLocation, unstable_HistoryRouter } from "react-router-dom";
import { useAuthContext } from './AuthProvider';
import fetchData from '../utils/fetchData2';

const Login = () => {
    // For redirect after authentication
    const navigate = useNavigate()
    /**
     * I believe the useLocation hook is Singleton in a way. It returns the location
     * object used by the react-router. That is how you can call it in each
     * component and get access to the same state.
     */
    const location = useLocation()

    // useState returns the current state and a function that updates it
    // done in array destructuring syntax
    const [state, setState] = useState({
        username: '',
        password: ''
    })

    /** Consume the context
     * Only need setToken from the context
     * Imported AuthContext at the top of the file
     */
    const { setToken } = useAuthContext();

    const handleSubmit = (e) => {
        // have to explicitly call preventDefault in functional components
        e.preventDefault();
        const { data, loading, error } = fetchData(
            'http://localhost:3000/users/login',
            'POST',
            { 'Content-Type': 'application/json'},
            state
            );
        console.log(data)

        if (tokenJSON.success === true) {
            setToken(tokenJSON);
            console.log('success')
            /** Redirect the user after successful login
             * When a login happens, we can take the previous page to redirect
             * the user to this desired page. If this page was never set as
             * state, we default to the Dashboard page:
             */
            const origin = location.state?.from?.pathname || '/'
            navigate(origin);
        };
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        // update whatever field is being typed in
        // wrap function in brackets for an implicit return of an object
        setState( (prevState) => ({
            ...prevState,
            [id]: value
        }));
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    <p>Username</p>
                    <input id='username' type='text' onChange={handleChange}/>
                </label>
                <label htmlFor='password'>
                    <p>Password</p>
                    <input id='password' type='password' onChange={handleChange}/>
                </label>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;