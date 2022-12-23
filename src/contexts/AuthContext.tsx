import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO } from '../dtos/UserDTO'

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContext {
  userCredential: UserDTO | null
  logout: () => Promise<void>
  saveUserCredential: (user: UserDTO | null) => void
}

const AuthContext = createContext({} as AuthContext)

export function AuthProvider ({ children, }: AuthProviderProps) {

  const [ userCredential, setUserCredential, ] = useState<UserDTO | null>(null)

  function saveUserCredential(user: UserDTO | null){
    setUserCredential(user)
    user && AsyncStorage.setItem('@labpass_user', JSON.stringify(user))
  }

  const loadUser = async (): Promise<UserDTO | null> => {
    const userStorage: string | null = await AsyncStorage.getItem('@labpass_user')
    const user = userStorage ? JSON.parse(userStorage) : null

    return user
  }

  async function logout(){
    saveUserCredential(null)
    return await AsyncStorage.removeItem('@labpass_user')
  }

  useEffect(() => {

    loadUser()
      .then(saveUserCredential)
      .catch(console.log)

  }, [])
  

  return (
    <AuthContext.Provider
      value={{
        saveUserCredential,
        logout,
        userCredential,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
