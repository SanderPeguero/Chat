import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() { return useContext(AuthContext) }

export default function AuthProvider({ children }){
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const history = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
            history('/chat')
        })
    }, [user, history])

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
