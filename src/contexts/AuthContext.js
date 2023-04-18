import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()

export const currentUser = true;

export function useAuth() {
    return useContext(AuthContext)
}

export function getEmail() {
    return auth.currentUser.email
}

export function logout() {
    return auth.signOut()
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout
    }
  return (
    <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
  )
}
