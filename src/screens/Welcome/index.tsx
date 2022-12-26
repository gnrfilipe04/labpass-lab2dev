import React, { useEffect, useRef, useState } from 'react'
import { Center, Text, VStack, HStack } from 'native-base'
import { Logo } from '../../components/Logo'
import { useNavigation } from '@react-navigation/native'
import { usePermission } from '../../hooks/usePermission'
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'
import { SocialButtons } from './blocks/SocialButtons'
import { MyAlertDialog } from '../../components/MyAlertDialog'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MotiView } from 'moti'

export function Welcome(){
  const { navigate, } = useNavigation()
  const { getAuth, getAuthRegister, } = usePermission()

  const [ isOpen, setIsOpen, ] = useState(false)
  const [ loginEnable, setLoginEnable, ] = useState(false)

  const cancelRef = useRef(null)

  const onClose = () => {
    setIsOpen(false)
  }

  const onConfirm = () => {
    setIsOpen(false)
    startActivityAsync(ActivityAction.SECURITY_SETTINGS)
  }

  function toHome(){
    navigate('home')
  }

  async function takeAuthPattern(){
    
    const authMethod = await getAuthRegister()
    if(authMethod){
      getAuth()
        .then(async response => {
          if(response.success){
            setLoginEnable(true)

            const user = await AsyncStorage.getItem('@labpass_user')
            if(!user) return
            
            toHome()
            
          }
        })
    }else {
      setLoginEnable(false)
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    takeAuthPattern()

  }, [])

  return (
    <>
      <VStack flex={1} bg={'secondary.900'} justifyContent={'center'}>
        <Center>
          <MyAlertDialog
            title='Padrão de segurança'
            description={'Não foi possível encontrar nenhum registro de padrão de segurança.\nAdicione um registro de padrão de segurança no seu dispositivo para ter acesso ao aplicativo.'} 
            cancelRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            onCancel={onClose}
            onConfirm={onConfirm}
          />
          <MotiView 
            from={{
              transform: [ { translateY: -50, }, ],
            }}

            animate={{
              transform: [ { translateY: 0, }, ],
            }}
          >
            <VStack alignItems={'center'}>
              <Logo mb={'20px'}/>
              <Text fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'secondary.500'}>Gerencie suas senhas</Text>
              <HStack space={'8px'}>
                <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'secondary.500'}>em</Text>
                <Text mt={'12px'} fontSize={20} fontFamily={'Inter_900Black'} lineHeight={20} color={'secondary.50'}>um só lugar.</Text>
              </HStack>
            </VStack>
          </MotiView>
        </Center>
        <SocialButtons loginEnable={loginEnable} />
      </VStack>
    </>
  )
}
