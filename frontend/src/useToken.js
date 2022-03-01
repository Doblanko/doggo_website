import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
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
    sessionStorage.setItem('token', JSON.stringify(tokenJSON))
    setToken(tokenJSON.token)
  }

  return {
    setToken: saveToken,
    token
  }
}