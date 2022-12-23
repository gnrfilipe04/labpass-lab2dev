import React from 'react'
import { Box, Center, HStack, Icon, VStack } from 'native-base'
import { PageTitle } from '../../components/Title'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function Config(){
  return (
    <Box flex={1} bg={'secondary.900'} px={'10px'}>
      <VStack mt={'70px'} space={'10px'}>
        <HStack alignItems={'center'} space={'20px'}>
          <Icon as={MaterialCommunityIcons} name={'arrow-left'} size={'26px'} color={'secondary.50'} onPress={() => {}}/>
          <PageTitle text="Configurações"/>
        </HStack>
      </VStack>
    </Box>
  )
}
