import React, { useState } from 'react';

const Login = () => {
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
        e.preventDefault();
        const tokenJSON = await loginUser(state);
        console.log(tokenJSON)
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
            <form onSubmit={handleSubmit}/>
        </div>
    )
}

export default Login;