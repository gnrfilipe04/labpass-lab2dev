import React, { useState } from  'react'
import { HStack, Icon, Text, VStack } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { useToast } from 'native-base'
import { usePermission } from '../../hooks/usePermission'
import { useNavigation } from '@react-navigation/native'

interface ListItemProps {
  iconName: string;
  iconColor: string;
  title: string;
  password: string;
}

export function ListItem({
  title, 
  password, 
  iconName, 
  iconColor, 
}: ListItemProps ){

  const [ passInvisible, setPassInvisible, ] = useState(true)
  const { getAuth, getAuthRegister, } = usePermission()

  const { navigate, } = useNavigation()

  const showPass = async () => {

    const authPatterns = await getAuthRegister()

    if (!authPatterns) return navigate('welcome')

    const resultAuth = await getAuth()

    if(resultAuth.success) return setPassInvisible(false)

  }
  const hidePass = () => setPassInvisible(true)
  const toast = useToast()

  function passObscure(pass: string){
    return Array.from({ length: pass.length, }, (_) => '•').join('')
  }

  async function copyPass(){
    
    await Clipboard.setStringAsync(password)

    setPassInvisible(true)

    toast.show({
      description: 'Copiado!',
    })
  }

  return (
    <HStack bg={'secondary.900'} space={'10px'} alignItems={'flex-end'}  justifyContent={'space-between'} >
      <HStack alignItems={'center'} space={'10px'} >
        <Icon as={MaterialCommunityIcons} name={iconName} color={iconColor} size={30} />
        <VStack w={'195px'} maxW={'195px'}>
          <Text fontSize={'14px'} fontFamily={'Inter_400Regular'} color={'secondary.500'}>{title}</Text>
          <Text
            numberOfLines={5}
            maxW={195}
            fontSize={'16px'} 
            fontFamily={'Inter_400Regular'} 
            color={'secondary.50'}>{ passInvisible ? passObscure(password) : password}</Text>
        </VStack>
      </HStack>
      {passInvisible 
        ? <Icon as={MaterialCommunityIcons} name={'eye-outline'} size={'24px'} color={'secondary.500'} onPress={showPass}/>

        : (
          <HStack space={'10px'}>
            <Icon as={MaterialCommunityIcons} name={'content-copy'} size={'24px'} color={'secondary.500'} onPress={copyPass}/>
            <Icon as={MaterialCommunityIcons} name={'eye-off-outline'} size={'24px'} color={'secondary.500'} onPress={hidePass}/>
          </HStack>
        ) }
    </HStack>
  )
}
