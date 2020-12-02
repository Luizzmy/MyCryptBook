import { useState, createContext, useContext, useEffect } from 'react'
import { currentUserFn } from '../services/auth'

export const DataContext = createContext()

export const DataCtxProvider = props => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getSessionData() {
            const { data } = await currentUserFn()
            login(data);
        }
        getSessionData()
    },[])

    const login = userInfo => {
        setUser(userInfo)

    }

    const logout = () => {
        setUser(null)
    }

    const value = { user, login, logout }

    return (
        // DataContext.Provider???
        <DataContext.Provider {...props} value={value} />
    )
}


export const useContextData = () => useContext(DataContext)

