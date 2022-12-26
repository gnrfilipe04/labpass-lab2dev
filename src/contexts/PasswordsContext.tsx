import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { PasswordDTO } from '../dtos/PasswordDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CryptoES from 'crypto-es'
import { SECRET_ENCRYPTED } from '@env'
import { decryptPasswords } from '../utils/decryptPasswords'
import { encryptPasswords } from '../utils/encryptPasswords'

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

  async function setPassInStorage(){

    const passEncrypted = encryptPasswords(passwordList)

    return await AsyncStorage.setItem('@lockpick_passwords', JSON.stringify(passEncrypted))

  }

  async function getPassInStorage(){
    
    const passwords = await AsyncStorage.getItem('@lockpick_passwords')

    if(!passwords) return

    const passwordsDecrypted = decryptPasswords(JSON.parse(passwords) as PasswordDTO[])

    return setPasswordList(passwordsDecrypted)

  }

  useEffect(() => {
    getPassInStorage()
  }, [])

  useEffect(() => {
    setPassInStorage()
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
