import { Modal } from "native-base";

type Props = {
  isModalOpen: boolean
  onOpenModal: (bool: boolean) => void
}

export function HabitsTimerInputModal({ isModalOpen, onOpenModal }: Props) {


  function closeModal() {
    onOpenModal(false)
  }
  return (
    <Modal
      justifyContent="center"
      alignItems="center"
      _backdrop={{
        bg: "black"
      }}
      isOpen={isModalOpen}
      onClose={closeModal}
    >

      {/* <VStack rounded="2xl" py={5} px={8} bg="gray.500">
        <Text color="white" fontSize="xl" fontFamily="semiBold">Defina seu tempo</Text>
        <Text color="white" fontSize="sm" fontFamily="body">
          Esse tempo será reiniciado toda noite.
        </Text>

      
        <HStack alignItems="center" space={4} mt={8} mb={3}>
          <HabitsTimerInputButton minutes={30} onPress={() => handleChangeTimer(1800)} />
          <HabitsTimerInputButton minutes={60} onPress={() => handleChangeTimer(3600)} />
          <HabitsTimerInputButton minutes={90} onPress={() => handleChangeTimer(5400)} />
        </HStack>

        <Text textAlign="center" color="white" fontSize="3xl" fontFamily="semiBold">
          {formatTimeWithHour(appTimer)}
        </Text>

        <HStack mt={8} alignItems="center" justifyContent="flex-end" space={2}>
          <Pressable onPress={closeModal}>
            <Text color="white" fontSize="lg" fontFamily="semiBold">Cancelar</Text>
          </Pressable>
          <Pressable onPress={closeModal}>
            <Text color="white" fontSize="lg" fontFamily="semiBold">
              Ok
            </Text>
          </Pressable>
        </HStack>
      </VStack> */}

    </Modal>
  )
}