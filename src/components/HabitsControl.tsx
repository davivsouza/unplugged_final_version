import { useTimerControl } from "@hooks/useTimerControl";
import { HabitsFloatButton } from "./HabitsFloatButton";
import { Center, FlatList, Text, VStack, } from "native-base";
import { useState } from "react";
import { HabitsControlSetTimerModal } from "./HabitsControlSetTimerModal";
import { AppTimer } from "@contexts/TimerControlContext";
import { Alert } from "react-native";
import { Loading } from "./Loading";
import { AppTimerCard } from "./AppTimerCard";
import Animated, { FadeInUp } from "react-native-reanimated";




export function HabitsControl() {
  const { timers, removeTimerControl } = useTimerControl()
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false)

  function handleOpenModal() {
    setShowModal(true);
  }

  async function removeTimer(timer: AppTimer) {
    try {
      setIsRemoving(true)
      removeTimerControl(timer)
    } catch (error) {
      setIsRemoving(false)
      return
    } finally {
      setIsRemoving(false)
    }
  }


  function handleDeleteTimer(timer: AppTimer) {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => removeTimer(timer)
        },
      ],
      { cancelable: false }
    );
  }


  return (
    <VStack position="relative" >
      {isRemoving && <Loading />}
      {!isRemoving && (
        <FlatList
          px={2}
          data={timers}
          h="85%"
          keyExtractor={item => item.appName}
          renderItem={({ item: timer, index }) => (
            <Animated.View entering={FadeInUp.delay(150 * index).duration(800).springify()} >

              <AppTimerCard
                onDeleteTimer={handleDeleteTimer}
                timer={timer}
              />
            </Animated.View>
          )}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Center>
              <Text color="gray.300" fontSize="md" fontFamily="heading">
                Nenhum timer configurado ainda.
              </Text>
            </Center>
          )}
        />
      )}
      <HabitsControlSetTimerModal isModalOpen={showModal} onOpenModal={setShowModal} />
      <HabitsFloatButton onPress={handleOpenModal} />
    </VStack>
  )
}