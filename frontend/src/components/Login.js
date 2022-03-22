import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from './AuthProvider';

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
        password: '',
        incorrectFlag: false,
    })

    /** Consume the context
     * Only need setToken from the context
     * Imported AuthContext at the top of the file
     */
    const { setToken } = useAuthContext();

    const login = async (credentials) => {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
        const dataJSON = await response.json()
        return dataJSON
    }

    const handleSubmit = async (event) => {
        // have to explicitly call preventDefault in functional components
        event.preventDefault();
        const tokenJSON = await login(state)

        if (tokenJSON.success === true) {
            // use the token hook
            setToken(tokenJSON);
            /** Redirect the user after successful login
             * When a login happens, we can take the previous page to redirect
             * the user to this desired page. If this page was never set as
             * state, we default to the Dashboard page:
             */
            const origin = location.state?.from?.pathname || '/'
            navigate(origin);
        } else {
            setState( (prevState) => ({
                ...prevState,
                incorrectFlag: true
            }));
        }
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        // update whatever field is being typed in
        // wrap function in brackets for an implicit return of an object
        // state hooks don't automatically merge changes, need to explicitly
        // merge them
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
                { state.incorrectFlag === true && <p>Incorrect username
                    or password</p>}
            </form>
        </div>
    )
}

export default Login;