import { createContext, useContext, useEffect, useState } from "react";
import { useAppStore, useLoginState } from "../store";
import { useAppDatabase } from "../databse-store";
import { getData } from "../database";

export const GlobalContext = createContext()


export default function GlobalContextProvider ({children}){
    const { userInfo, updateUserInfo } = useAppStore()
    const { login, updatedLogin } = useLoginState()
    const [useInfo, setUserInfo] = useState(null)
    const USER = {useInfo, setUserInfo}

    const {database, updatedDatabase} = useAppDatabase()

    const [DB, setDB] = useState([]), DATABASE = {DB, setDB}

    const handleDatabase = () => {
        database.forEach(async element => {
            const data = await getData(element)
            setDB(prev => [...prev, data])
        });
    }

    useEffect(() => {
        return handleDatabase()
    }, [])
  
    useEffect(() => {
      const data = localStorage.getItem('note-app-user')
      if(data !== null){
        const convert = JSON.parse(data)
        updateUserInfo(convert)
        updatedLogin(true)
      } else {
        updatedLogin(false)
      }
      
    }, [])

   

    return(
        <GlobalContext.Provider value={{USER, DATABASE}}>
            {children}
        </GlobalContext.Provider>
    )
}

/**
 * @returns {{USER : {useInfo : {}, setUserInfo : (value : useInfo) => void}, DATABASE : {DB:Array<{}>, setDB : (value:{}) => void}}}
 */
export const useGlobalContext = () => useContext(GlobalContext)