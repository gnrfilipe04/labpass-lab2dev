import React from 'react'
import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { Controller, Control, FieldValues, Path  } from 'react-hook-form'

interface MyInputProps<T extends FieldValues> {
  control: Control<T, any>;
  placeholder?: string;
  InputRightElement?: JSX.Element | JSX.Element[] | undefined;
  secureTextEntry?: boolean;
  name: Path<T>;
  type?: string;
  errorMessage?: string;
  defaultValue?: string
}

export function MyInput<T extends FieldValues>({
  control,
  placeholder,
  InputRightElement,
  secureTextEntry,
  name,
  errorMessage,
  type,
  defaultValue,
}: MyInputProps<T>){
  return (
    <>
      <Controller 
        control={control}
        render={({ field: { onChange, onBlur, value, }, }) => {
          return (
            <Input
              defaultValue={defaultValue}
              isInvalid={Boolean(errorMessage)}
              onBlur={onBlur}
              borderColor={'secondary.500'}
              selectionColor={'primary.400'}  
              bgColor={'transparent'}
              placeholderTextColor={'secondary.500'}
              fontFamily={'Inter_400Regular'}
              fontSize={'16px'} 
              type={type}
              secureTextEntry={secureTextEntry}
              InputRightElement={InputRightElement}
              _focus={{
                placeholderTextColor: 'secondary.50',
                borderColor: 'primary.400',
              }} 
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
            />
          )}}
        name={name}
      />
      {errorMessage && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>}
    </>
  )
}
