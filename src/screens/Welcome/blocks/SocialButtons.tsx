import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, VStack } from 'native-base'
import { MyButton } from '../../../components/MyButton'
import { useGoogleSignIn } from '../../../hooks/useGoogleSignIn'
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from '@env'
import { MyAlertDialog } from '../../../components/MyAlertDialog'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Platform } from 'react-native'
import { MotiView } from 'moti'

import * as WebBrowser from 'expo-web-browser'
import { useFacebookSignIn } from '../../../hooks/useFacebookSignIn'
import { useAuth } from '../../../contexts/AuthContext'

WebBrowser.maybeCompleteAuthSession()

export function SocialButtons(){

  const { loginEnable } = useAuth()

  const { navigate, } = useNavigation()

  const [ isOpenErrorLogin, setIsOpenErrorLogin, ] = useState(false)

  const [ loading, setLoading, ] = useState(false)

  const cancelRef = useRef(null)

  const onCloseErrorLogin = () => {
    setIsOpenErrorLogin(false)
  }

  const onConfirmErrorLogin = () => {
    setIsOpenErrorLogin(false)
  }

  const { onLoginFacebook, } = useFacebookSignIn()

  const { onLoginGoogle, request,} = useGoogleSignIn({
    clientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  })

  return (
    <VStack space={'10px'} mt='50px' mx={'20px'}>
      <MotiView
        from={{
          transform: [ { translateX: -50, }, ],
        }}

        animate={{
          transform: [ { translateX: 0, }, ],
        }}
      >
        <MyButton
          title='Continuar com Google'
          disable={!loginEnable || !request}
          iconSize={30}
          leftIcon={<MaterialCommunityIcons name={'google'}/>}
          leftIconColor={'primary.300'}
          textColor={'white'} 
          bgColor={'secondary.600'}
          onPress={() => {
            setLoading(true)
            onLoginGoogle()
              .then((session) => {
                //console.log({session,})
                session?.type === 'success' && navigate('home')
              })
              .catch(() => setIsOpenErrorLogin(true))
              .finally(() => setLoading(false))
          }}
        />
      </MotiView>

      <MotiView
        from={{
          transform: [ { translateX: -50, }, ],
        }}

        animate={{
          transform: [ { translateX: 0, }, ],
        }}
      >
        <MyButton
          title='Continuar com Facebook'
          disable={!loginEnable || !request}
          iconSize={30}
          leftIcon={<MaterialCommunityIcons name={'facebook'}/>}
          leftIconColor={'primary.300'}
          textColor={'white'} 
          bgColor={'secondary.600'}
          onPress={() => {
            setLoading(true)
            onLoginFacebook()
              .then(user => user && navigate('home') )
              .catch(() => setIsOpenErrorLogin(true))
              .finally(() => setLoading(false))
          }}
        />
      </MotiView>

      {Platform.OS === 'ios' && <MyButton
        title='Continuar com Apple'
        onPress={() => {}}
        iconSize={30}
        disable={!loginEnable}
        leftIcon={<MaterialCommunityIcons name='apple'/>}
        leftIconColor={'primary.300'}
        textColor={'white'} 
        bgColor={'secondary.600'}
      />}

      <MyAlertDialog 
        cancelRef={cancelRef}
        onClose={onCloseErrorLogin}
        isOpen={isOpenErrorLogin}
        onConfirm={onConfirmErrorLogin}
        confirmText={'Ok'}
        title={'Erro na autenticação!'}
        description={'Não foi possível realizar o login.\nTente realizar outro método de autenticação'}
      />

      <Box h={'10'}>
        {loading && <ActivityIndicator color={'#262626'}/>}
      </Box>
    </VStack>
  )
}
