import { createContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    //const [auth, setAuth] = useState({});
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem("accessToken") || null,
        user: localStorage.getItem("user") || null,
      });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;