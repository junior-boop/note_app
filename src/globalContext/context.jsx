import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext()


export default function GlobalContextProvider (){
    
    const [useInfo, setUserInfo] = useState(null)
    const USER = [useInfo, setUserInfo]


    return(
        <GlobalContext.Provider value={{USER}}>

        </GlobalContext.Provider>
    )
}

/**
 * @returns {{USER : [useInfo : {}, setUserInfo : () => void]}}
 */
export const useGlobalContext = () => useContext(GlobalContext)