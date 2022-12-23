import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { PasswordDTO } from '../dtos/PasswordDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface PasswordsProviderProps {
    children: ReactNode;
}

interface PasswordsContext {
  passwordList: PasswordDTO[]
  addPassword: (password: PasswordDTO) => void
  removePassword: (idPassword: string) => void
}

const PasswordsContext = createContext({} as PasswordsContext)

export function PasswordsProvider ({ children, }: PasswordsProviderProps) {
  const [ passwordList, setPasswordList, ] = useState<PasswordDTO[]>([])

  function addPassword(password: PasswordDTO){
    setPasswordList([ password,...passwordList, ])
  }

  function removePassword(idPassword: string){
    const passwordsFiltered = passwordList.filter(pass => pass.id !== idPassword)
    setPasswordList(passwordsFiltered)
  }

  useEffect(() => {
    AsyncStorage.getItem('@lockpick_passwords')
      .then(passwords => passwords && setPasswordList(JSON.parse(passwords)))
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('@lockpick_passwords', JSON.stringify(passwordList))
  }, [ passwordList.length, ])

  return (
    <PasswordsContext.Provider
      value={{
        passwordList,
        addPassword,
        removePassword,
      }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export const usePasswords = () => useContext(PasswordsContext)
