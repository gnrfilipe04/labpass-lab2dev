import React from 'react'
import { Select } from 'native-base'
import { Controller, Control, FieldValues, Path  } from 'react-hook-form'
import { ErrorMessage } from '../MyInput/ErrorMessage';

export interface MySelectProps<T extends FieldValues> {
  control: Control<T, any>;
  placeholder?: string;
  name: Path<T>;
  errorMessage?: string;
  items: {
    key: string,
    label: string,
    value: string
  }[]
}

export function MySelect<T extends FieldValues>({
  control,
  placeholder,
  name,
  errorMessage,
  items,
}: MySelectProps<T>){
  return (
    <>
      <Controller 
        control={control}
        render={({ field: { onChange, onBlur, value, }, }) => (
          <Select
            opacity={1}
            placeholder={placeholder}
            borderColor={errorMessage ? 'error.500' : 'secondary.500'} 
            bgColor={'transparent'}
            fontFamily={'Inter_400Regular'}
            fontSize={'16px'}
            placeholderTextColor={'secondary.500'}
            _selectedItem={{
              placeholderTextColor: 'secondary.50',
              borderColor: 'secondary.400',
            }}
            selectedValue={value}
            onValueChange={onChange} 
          >
            {items.map(item => (
              <Select.Item key={item.key} label={item.label} value={item.value}/>
            ))}
            
          </Select>
        )}
        name={name}
      />
      {errorMessage && <ErrorMessage message={errorMessage}/>}
    </>
  )
}
