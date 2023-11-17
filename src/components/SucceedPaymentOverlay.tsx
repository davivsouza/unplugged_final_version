import { Center, Image, PresenceTransition, Text, VStack } from "native-base";
import CheckIcon from '@assets/shop/check-icon.png'
import { useEffect } from "react";

type Props = {
  isLoadedOverlay: boolean
  onCloseOverlay: (bool: boolean) => void
}

export function SucceedPaymentOverlay({ isLoadedOverlay, onCloseOverlay }: Props) {

  useEffect(() => {
    setTimeout(() => {
      onCloseOverlay(false)
    }, 1800);
  }, [])

  return (

    <VStack
      alignItems="center"
      justifyContent="center"
      flex={1}
      bg="purple.400"
    >
      <PresenceTransition visible={isLoadedOverlay} initial={{
        opacity: 0.5,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 350
        }
      }}
      >
        <Image
          alignSelf="center"
          w={20}
          h={20}
          source={CheckIcon}
          alt="Pagamento concluído"
        />
        <Text mt={4} color="white" fontFamily="body" fontSize="xl">Pagamento concluído!</Text>
      </PresenceTransition>
    </VStack>
  )
}