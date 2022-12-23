import React, { useState } from 'react'
import { Button, Center, FormControl, Input, Stack, Text, VStack, WarningOutlineIcon } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { MyInput } from '../../components/MyInput'
import { UserDTO } from '../../dtos/UserDTO'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'  
import { yupResolver } from '@hookform/resolvers/yup'
import { PageTitle } from '../../components/Title'



export function Register(){
  const [ errorMessage, setErrorMessage, ] = useState('')
  const [ user, setUser, ] = useState<UserDTO>({} as UserDTO)
  const { navigate, goBack, } = useNavigation()

  const createUserFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  })

  const { handleSubmit, formState: { errors, }, control, } = useForm<UserDTO>({
    resolver: yupResolver(createUserFormSchema),
  })

  async function onSubmit(){

    if(!user.username || !user.name || !user.phone || !user.email || !user.password){
      return setErrorMessage('Todos os campos são obrigatórios')
    }

    // await AsyncStorage.setItem('@lockpick_username', user.name)
    // await AsyncStorage.setItem('@lockpick_userLogged', JSON.stringify(user))
    navigate('home')
  }

  return (
    <Center flex={1} bg={'secondary.900'}>
      <VStack space={'10px'}>
        <PageTitle text='Criar conta'/>
        <FormControl>
          <Stack space={'10px'}>
            <MyInput
              type="text"
              placeholder="Usuário"
              control={control}
              name="username"
            />
            <MyInput
              type="text"
              placeholder="Nome"
              control={control} 
              name="name" 
            />
            <MyInput
              type="text"
              placeholder="Celular"
              control={control}
              name="phone"
            />
            <MyInput
              type="text"
              placeholder="E-mail"
              control={control}
              name="email"  
            />
            <MyInput
              type="text"
              placeholder="Senha"
              control={control}
              name="password"  
            />

            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.email?.message}
            </FormControl.ErrorMessage>
          </Stack>
          <VStack space={'10px'} mt={'20px'}>
            <Button 
              bg={'secondary.400'} 
              disabled={Boolean(errorMessage)} 
              opacity={errorMessage ? 0.4 : 1} 
              w={'110%'}
              _pressed={{
                background: 'purple.700',
              }}  
              onPress={handleSubmit(onSubmit)}>Avançar</Button>
            <Button 
              bg={'secondary.500'} 
              w={'110%'} 
              _pressed={{
                background: 'gray.600',
              }}  
              onPress={() => goBack()}>Voltar</Button>
          </VStack>
        </FormControl>
      </VStack>
      
    </Center>
  )
}
