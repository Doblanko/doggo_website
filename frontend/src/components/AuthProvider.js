import React from "react";
import useToken from "../hooks/useToken"

/** Context Explanation
 * Use context to pass the token to all of the components. Can't import useToken
 * into every component that needs authentication because React will generate a 
 * new component each time. When you first render that component it will pull the
 * token from localStorage. However, for subsequent checks it will be in state
 * for each component instance.
 * If the token is changed for whatever reason, all of the other components that
 * import useToken won't pull that new value from localStorage until the next
 * time you visit the site (they read from state during a browsing session and
 * only initiaize from localStorage).
 * 
 * Don't initialize to any value (null)
 */
const AuthContext = React.createContext(null);

// best practices to use this line in the Auth provider file
// tells react to use the context created above
const useAuthContext = () => React.useContext(AuthContext)

/**
 * Children is a special prop, automatically passed to every component, that can
 * be used to render the content included between the opening and closing tags
 * when invoking a component.
 */
const AuthProvider = ({ children }) => {

   /** Custom token hook
   * Create a token hook to be sent to the context. You can't import and use the
   * hook in every component because each component will create and use it's own
   * instance of the hook. For more info read above comment for creating context.
   */
  const { token, setToken } = useToken()
    
    const value = {
        token,
        setToken
    }

    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}

/**
 * For use in the main app and to access context in components
 * No one can tamper directly with the context object (AuthContext) anymore.
 * Everything is encapsulated in the custom context hook and custom Provider
 * component.
 */
export { AuthProvider, useAuthContext }