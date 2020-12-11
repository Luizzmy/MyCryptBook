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
    }, [])

    const login = userInfo => {
        setUser(userInfo)

    }

    const logout = () => {
        setUser(null)
    }

    const addProfilePic= img => setUser({...user, img})

    const value = { user, login, logout, addProfilePic }

    return (
        // DataContext.Provider
        <DataContext.Provider {...props} value={value} />
    )
}

// useContextData goes to components
export const useContextData = () => useContext(DataContext)

