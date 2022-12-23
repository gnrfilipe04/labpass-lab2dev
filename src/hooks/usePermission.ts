import { useNavigation } from '@react-navigation/native'
import * as LocalAuthentication from 'expo-local-authentication'

export function usePermission(){

  const { navigate, } = useNavigation()

  const getAuthAvailable = async () => {
    const authMethods = await LocalAuthentication.supportedAuthenticationTypesAsync()
    return authMethods
  }

  const getAuthRegister = async () => {
    const authMethods = await LocalAuthentication.getEnrolledLevelAsync()
    return authMethods
  }

  const getAuth = async () => {

    const authMethods = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para continuar',
      fallbackLabel: 'Errou a senha',
      cancelLabel: 'Errou a senha',
    })
    return authMethods
  }

  return {
    getAuthAvailable,
    getAuthRegister,
    getAuth,
  }
}
