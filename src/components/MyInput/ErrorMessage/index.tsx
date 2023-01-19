import { HStack, Text, WarningOutlineIcon } from "native-base"

interface ErrorMessageProps{
    message: string
}

export function ErrorMessage({ message }: ErrorMessageProps){
    return (
        <HStack space={2} alignItems='center'>
            <WarningOutlineIcon size='xs' color={'error.500'}/>
            <Text color={'error.500'}>{message}</Text>
        </HStack>
    )
}