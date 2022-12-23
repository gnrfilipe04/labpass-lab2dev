import React from 'react'
import { Box, VStack } from 'native-base'
import { Form } from './blocks/Form'

export function NewPass(){

  return (
    <Box flex={2} bg={'secondary.900'} px={'20px'} py={'50px'} >
      <VStack space={'20px'}>
        <Form />
      </VStack>
    </Box>
  )
}
