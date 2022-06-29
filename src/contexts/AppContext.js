import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../initializers/firebase'

export const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }) {
  const [ user, setUser ] = useState()
  const [ authLoaded, setAuthLoaded ] = useState(false)

  useEffect(()=> {
    console.log('Auth loaded changed', authLoaded)
  },[ authLoaded])
  

  useEffect(()=> {
    auth.onAuthStateChanged(async(user) => {
      if(user){
        setUser(user)
        console.log('User authenticated!', user)
      }
      else {
        // User not signed in
      }
      setAuthLoaded(true)
      console.log('Auth loaded!')
    })
  },[])

  return (
    <AppContext.Provider
      value = {{
        user, 
        authLoaded
      }}
    >
      { children }
    </AppContext.Provider>
  )

}