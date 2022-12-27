import { FACEBOOK_CLIENT_ID, FACEBOOK_SECRET, REDIRECT_URI } from '@env'
import axios from 'axios'
import * as AuthSession from 'expo-auth-session'
import { useAuth } from '../contexts/AuthContext'
import { UserDTO } from '../dtos/UserDTO'

export function useFacebookSignIn(){

  const { saveUserCredential, } = useAuth()

  const getCode = async () => {

    const authUrl = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

    const response = await AuthSession.startAsync({ authUrl, })

    if (response.type !== 'success') return null

    return response.params.code

  }

  const getToken = async () => {

    const code = await getCode()

    const { data, } = await axios(`https://graph.facebook.com/v15.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${FACEBOOK_SECRET}&code=${code}`)

    if(!data.access_token) return null

    return data.access_token 

  }

  const getUser = async () => {
    const access_token = await getToken()

    const { data: userData, } = await axios(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`)

    const [ given_name, family_name, ] = userData.name.split(' ') 

    const user: UserDTO = {
      email: userData.email,
      id: userData.id,
      given_name,
      family_name,
      locale: null,
      name: userData.name,
      picture: userData.picture.data.url,
      verified_email: true,
      
    }
    
    saveUserCredential(user)

    return user
  }

  async function onLoginFacebook(){
    try{
      return await getUser()
    }catch(e){
      return console.log(e)
    }
  }

  return {
    onLoginFacebook,
  }
}
