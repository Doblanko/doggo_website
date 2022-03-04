import { useState } from 'react';

/** Custom Hooks
 * By convention, custom Hooks start with the keyword 'use'
 */
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const tokenJSON = JSON.parse(tokenString);
    /** '?.' explanation
     * need to use the optional chaining operator '?.' when accessing token because when you
     * first access the application, the value of sessionStorage.getItem('token') will be undefined, if you try to access
     * a property you will get an error
     */
    return tokenJSON?.token
  }

  // initialize state with the getToken function
  const [token, setToken] = useState(getToken());

  const saveToken = (tokenJSON) => {
    // save to localstorage
    localStorage.setItem('token', JSON.stringify(tokenJSON))
    // save to state
    setToken(tokenJSON.token)
  }
  // return as an object to allow destructuring
  return {
    setToken: saveToken,
    token
  }
}