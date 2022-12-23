import React from 'react'
import { AlertDialog, Button } from 'native-base'
import { GestureResponderEvent } from 'react-native'

interface MyAlertDialogProps {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  cancelRef: React.RefObject<any>
  isOpen: boolean
  onCancel?: () => void
  onClose?: () => void
  onConfirm?: ((event: GestureResponderEvent) => void)
}

export function MyAlertDialog({
  title,
  confirmText,
  cancelText,
  description,
  cancelRef,
  isOpen,
  onCancel,
  onClose,
  onConfirm,
}: MyAlertDialogProps){
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        {onClose && <AlertDialog.CloseButton />}
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{description}</AlertDialog.Body>
        {onClose || onConfirm ? <AlertDialog.Footer>
          <Button.Group space={2}>

            {onCancel ? <Button variant="unstyled" colorScheme="coolGray" onPress={onCancel} ref={cancelRef}>
              {cancelText || 'Cancelar'}
            </Button> : <></>}

            {onConfirm ? <Button bgColor={'secondary.400'} onPress={onConfirm}>
              {confirmText || 'Confirmar'}
            </Button> : <></>}

          </Button.Group>
        </AlertDialog.Footer> : <></>}
      </AlertDialog.Content>
    </AlertDialog>
  )
}
