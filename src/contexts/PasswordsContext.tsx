import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { PasswordDTO } from '../dtos/PasswordDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decryptPasswords } from '../utils/decryptPasswords'
import { encryptPasswords } from '../utils/encryptPasswords'
import { useAuth } from './AuthContext'

interface PasswordsProviderProps {
    children: ReactNode;
}

interface PasswordsContext {
  passwordList: PasswordDTO[]
  addPassword: (password: PasswordDTO) => void
  removePassword: (idPassword: string) => void
  setPasswordList: React.Dispatch<React.SetStateAction<PasswordDTO[]>>
}

const PasswordsContext = createContext({} as PasswordsContext)

export function PasswordsProvider ({ children, }: PasswordsProviderProps) {

  const { userCredential } = useAuth()

  const [ passwordList, setPasswordList, ] = useState<PasswordDTO[]>([])
  const [ keyPassStorage, setKeyPassStorage, ] = useState<string>('')

  function addPassword(password: PasswordDTO){
    setPasswordList([ password,...passwordList, ])
  }

  function removePassword(idPassword: string){
    const passwordsFiltered = passwordList.filter(pass => pass.id !== idPassword)
    setPasswordList(passwordsFiltered)
  }

  async function setPassInStorage(){

    const passEncrypted = encryptPasswords(passwordList)

    return await AsyncStorage.setItem(keyPassStorage, JSON.stringify(passEncrypted))

  }

  async function getPassInStorage(){

    const passwords = await AsyncStorage.getItem(keyPassStorage)

    if(!passwords) return

    const passwordsDecrypted = decryptPasswords(JSON.parse(passwords) as PasswordDTO[])

    return setPasswordList(passwordsDecrypted)

  }

  useEffect(() => {
    userCredential && setKeyPassStorage(`@lockpick_passwords_${userCredential.email}`)
  }, [userCredential?.email])

  useEffect(() => {
    keyPassStorage && getPassInStorage()
  }, [keyPassStorage])

  useEffect(() => {
    userCredential && setPassInStorage()
  }, [ passwordList.length, ])

  return (
    <PasswordsContext.Provider
      value={{
        passwordList,
        addPassword,
        removePassword,
        setPasswordList
      }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export const usePasswords = () => useContext(PasswordsContext)
