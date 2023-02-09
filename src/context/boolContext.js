import { createContext, useState } from "react";

export const BoolContext = createContext();

export const BoolContextProvider = ({children})=>{
    const [bool,setBool] = useState(false);
    
    return (
        <BoolContext.Provider value={{bool,setBool}}>
            {children}
        </BoolContext.Provider>
    )
}