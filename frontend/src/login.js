import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    // useState returns the current state and a function that updates it
    // done in array destructuring syntax
    const [state, setState] = useState({
        username: '',
        password: ''
    })

    const loginUser = async (credentials) => {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        return data
    }

    const handleSubmit = async (e) => {
        // have to explicitly call preventDefault in functional components
        e.preventDefault();
        const tokenJSON = await loginUser(state);
        if (tokenJSON.success === true) {
            setToken(tokenJSON);
            console.log('success')
            /*********************************************************************************/
            // What to do after successful login
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