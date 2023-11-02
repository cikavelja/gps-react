import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);

    if (localStorage.getItem("accessToken")){
        //this.auth = {}
        auth.accessToken=localStorage.getItem("accessToken");
        auth.user=localStorage.getItem("user");
        
    };
    //console.log(JSON.stringify(auth?.user ? "Logged In" : "Logged Out"));
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;