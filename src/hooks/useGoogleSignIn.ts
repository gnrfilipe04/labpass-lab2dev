import { useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import { useAuth } from '../contexts/AuthContext'
import { UserDTO } from '../dtos/UserDTO'

interface UseGoogleSigninProps {
  clientId: string;
  iosClientId: string;
  androidClientId: string;
  language?: string
}

export function useGoogleSignIn({ 
  clientId,
  androidClientId,
  iosClientId,
  language,
}: UseGoogleSigninProps){

  const { saveUserCredential, userCredential, } = useAuth()

  const [ accessToken, setAccessToken, ] = useState<string | undefined | null>(null)
  
  const [ request, response, promptAsync, ] = Google.useIdTokenAuthRequest(
    {
      clientId,
      androidClientId,
      iosClientId,
      language: language || 'pt-BR',
    }
  )

  async function fetchUserInfo(){
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userInfo: UserDTO | null = await response.json()
    saveUserCredential(userInfo)
  }


  const onLoginGoogle = async () => {
    try {
      return await promptAsync()

    }catch(e){
      console.log(e)
    }

  }
  
  useEffect(() => {

    if(response?.type === 'success'){
      
      setAccessToken(response.authentication?.accessToken)
      accessToken && fetchUserInfo()
    }

  }, [ response, accessToken, ])

  
  return {
    accessToken,
    request,
    response,
    onLoginGoogle,
  }

}
