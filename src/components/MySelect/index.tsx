import React from 'react'
import { FormControl, Input, ISelectItemProps, Select, WarningOutlineIcon } from 'native-base'
import { Controller, Control, FieldValues, Path  } from 'react-hook-form'

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
            borderColor={'secondary.500'} 
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
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </>
  )
}
