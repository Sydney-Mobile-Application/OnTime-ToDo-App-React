import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { auth } from '../config/firebase/index'
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'

const AuthContext = createContext({
  currentUser: null,
  forgotPassword: () => Promise,
})



export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {

  const mounted = useRef(false)

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  // const [currentUser, setCurrentUser] = useState(null);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //      setCurrentUser(user ? user : null)
  //   })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('The user is', currentUser)
  // }, [currentUser])

  
  function forgotPassword(textEmail) {
    return sendPasswordResetEmail(auth, textEmail, {
      url: `http://localhost:3000/login`,
    })
  }


  const value = {
    // currentUser,
    forgotPassword,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
