
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { FormControl, Icon, Pressable, Text, VStack } from 'native-base'
import { SubmitHandler, useForm } from 'react-hook-form'
import uuid from 'react-native-uuid'
import * as yup from 'yup'
import { MyInput } from '../../../../components/MyInput'
import { MySelect, MySelectProps } from '../../../../components/MySelect'
import { PageTitle } from '../../../../components/Title'
import { usePasswords } from '../../../../contexts/PasswordsContext'
import { PasswordDTO } from '../../../../dtos/PasswordDTO'
import { socialIcons } from '../../../../mock/socialIcons'
import { MyButton } from '../../../../components/MyButton'
import { generatePass } from '../../../../utils/generatePassword'

export interface FormDataProps {
  category: string
  description: string
  password: string
}

export function Form(){

  const { navigate, } = useNavigation()
  const { addPassword, } = usePasswords()
  
  const [ showPass, setShowPass, ] = useState(false)

  const [ passGenerated, setPassGenerated, ] = useState<string | undefined>()

  const createUserFormSchema = yup.object().shape({
    category: yup.string().required('Categoria é obrigatória'),
    description: yup.string().required('Descrição é obrigatória'),
    password: yup.string().required('Senha obrigatória')
      .min(6, 'No mínimo 6 caracteres')
      .max(20, 'No máximo 20 caracteres')
      .default(passGenerated),
  })

  const { handleSubmit, formState: { errors, }, control, } = useForm<FormDataProps>({
    resolver: yupResolver(createUserFormSchema),
  })

  const selectItems: MySelectProps<FormDataProps>['items'] =  Object.keys(socialIcons).map(iconName => ({
    key: iconName,
    label: iconName,
    value: iconName,
  }))

  const mountPassword = (data: FormDataProps) => {
    const icon = socialIcons[data.category]

    if(!icon) return

    let newData: PasswordDTO = {
      ...data,
      id: uuid.v4(),
      iconColor: icon.iconColor,
      iconName: icon.iconName,
    }

    return newData
  }

  const onSubmit: SubmitHandler<FormDataProps> = ( data: FormDataProps ) => {
    const password = mountPassword(data)

    if(!password) return

    addPassword(password)
    navigate('home')
  }

  return (
    <FormControl isInvalid={Boolean(errors.category || errors.description || errors.password)} isRequired justifyContent={'center'} h={'92%'}>
      <VStack space={'16px'}>
        <PageTitle text={'Nova senha'}/>
        <VStack space={'10px'}>

          <MySelect 
            control={control}
            name='category'
            placeholder='Escolha a categoria'
            items={selectItems}
            errorMessage={errors.category?.message}
          />

          <MyInput
            control={control}
            placeholder="Descrição"
            name='description'
            errorMessage={errors.description?.message}
          />

          <MyInput
            defaultValue={passGenerated} 
            control={control}
            type={'password'}
            secureTextEntry={!showPass}
            InputRightElement={
              <Pressable onPress={() => setShowPass(!showPass)}>
                <Icon as={<MaterialCommunityIcons name={showPass ? 'eye-outline' : 'eye-off-outline'} />} size={5} mr="2" color="secondary.500"/>
              </Pressable>}
            placeholder="Senha"
            name='password'
            errorMessage={errors.password?.message}
          />
          <Pressable onPress={() => setPassGenerated(generatePass({ length: 15, }))}>
            <Text 
              textAlign={'right'}
              fontFamily={'Inter_400Regular'} 
              fontSize={16}
            >Gerar senha</Text>
          </Pressable>

        </VStack>
        <VStack mt={'20px'} space={'10px'}>
          <MyButton 
            title='Salvar'
            onPress={handleSubmit(onSubmit)}
            textColor='white'
            bgColor={'primary.400'}
          />
          <MyButton 
            title='Cancelar'
            onPress={() => navigate('home')}
            textColor='white'
            bgColor={'secondary.500'}
          />
        </VStack>
      </VStack>
    </FormControl>
  )
}
