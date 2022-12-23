import React, { ReactNode } from 'react'
import { HStack, Icon, Pressable, Text } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

interface MyButtonProps {
  title: string
  bgColor: ColorType
  disable?: boolean
  textColor: ColorType
  leftIcon?: ReactNode
  leftIconColor?: ColorType
  rightIcon?: ReactNode
  rightIconColor?: ColorType
  iconSize?: number
  onPress: () => void
}

export function MyButton({
  title,
  bgColor,
  disable,
  textColor,
  leftIcon,
  leftIconColor,
  iconSize,
  rightIcon,
  rightIconColor,
  onPress,
}: MyButtonProps){
  return (
    <Pressable _pressed={{ opacity: 0.8, }} opacity={disable ? 0.5 : 1} onPress={() => !disable && onPress()} bg={bgColor || 'secondary.500'} borderRadius={'full'} p='10px'>
      <HStack justifyContent={'center'} alignItems='center'>
        { leftIcon && <Icon as={leftIcon} color={leftIconColor} size={iconSize} position='absolute' left={0}/> }
        <Text paddingY={'5px'}  textAlign={'center'} color={textColor} fontFamily={'Inter_400Regular'}>{title}</Text>
        { rightIcon && <Icon as={rightIcon} color={rightIconColor} size={iconSize} position='absolute' right={0}/> }
      </HStack>
    </Pressable>
  )
}
