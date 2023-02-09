import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("unsplashUser")) || null
    );

    const login = (inputs)=>{
        setCurrentUser(inputs);
    }

    useEffect(()=>{
        localStorage.setItem("unsplashUser",JSON.stringify(currentUser));
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser,login}}>
            {children}
        </AuthContext.Provider>
    )
}