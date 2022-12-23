import React from 'react'
import { Text } from 'native-base'

interface PageTitleProps {
  text: string
}

export function PageTitle({
  text,
}: PageTitleProps){
  return (
    <Text color={'secondary.50'} fontFamily={'Inter_900Black'} fontSize={'24px'}>{text}</Text>
  )
}
