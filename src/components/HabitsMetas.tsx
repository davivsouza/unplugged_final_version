import { Center, FlatList, Text, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { HabitsCard } from "./HabitsCard";
import { HabitsFloatButton } from "./HabitsFloatButton";
import { HabitsMetasFormModal } from "./HabitsMetasFormModal";
import { useGoals } from "@hooks/useGoals";
import { api } from '../services/api'
import { AppError } from '@utils/AppError'
import dayjs from 'dayjs'
import "dayjs/locale/pt-br"
import { Loading } from "./Loading";
import { HabitDTO } from "../dtos/HabitDTO";
import { useFocusEffect } from "@react-navigation/native";
import { useNotification } from "@hooks/useNotification";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

export type OnCompleteProps = {
  userId: string | undefined
  dayOfWeek: number | undefined
}


const day = dayjs().locale('pt-br').format('DD').toString()
const month = dayjs().locale('pt-br').format('MM').toString()
const year = dayjs().locale('pt-br').format('YYYY').toString()
const formatedMonth = month.charAt(0).toUpperCase() + month.slice(1)
const today = `${day}/${formatedMonth}/${year}`

const currentDayOfWeek = Number(dayjs().day())

export function HabitsMetas() {
  const toast = useToast()
  const { goals, loadTodayHabits, isLoadingHabits } = useGoals()
  const { scheduleHabitsReminderNotification, dismissNotification } = useNotification()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (goals.length > 0) {
      scheduleHabitsReminderNotification({
        title: 'Ainda dá tempo! 🕐',
        body: 'Você ainda tem alguns hábitos incompletos',
        seconds: 3600 * 2
      })
    }
  }, [goals.length])

  async function handleCompleteHabit(habitId: number, userId: string) {
    try {
      await api.post(`/habits/complete`, {
        habitId,
        userId,
        dayOfWeek: currentDayOfWeek
      })

      toast.show({
        title: 'Hábito conclúido com sucesso!',
        placement: 'top',
        bgColor: 'green.700',

      })
      loadTodayHabits()
    } catch (error) {

      toast.show({
        title: "Não foi possível completar o hábito",
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  async function handleDeleteHabit(id: number) {
    try {
      dismissNotification('HabitsReminder')
      await api.delete(`/habits/${id}`)
      // toast.show({
      //   title: 'Hábito excluído com sucesso!',
      //   placement: 'top',
      //   bgColor: 'red.500',

      // })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      loadTodayHabits()
    }

  }

  function checkIsHabitCompleted(habit: HabitDTO) {
    const isCompletedFilter = habit.habitLogs?.filter(habitlog => habitlog.dayOfWeek === Number(dayjs().day()))
    return isCompletedFilter || []
  }


  function handleOpenModal() {
    setShowModal(true);
  }


  useFocusEffect(useCallback(() => {
    loadTodayHabits()
  }, []))
  return (
    <VStack position="relative" px={3}>
      <>
        <HabitsMetasFormModal isModalOpen={showModal} onOpenModal={setShowModal} />
        <Text color="white" fontFamily="semiBold" fontSize="xl" my={6} px={2}>Hoje - {today}</Text>
        {isLoadingHabits && <Loading />}

        {!isLoadingHabits && (
          <FlatList
            data={goals}
            h="80%"
            keyExtractor={item => String(item.id)}
            renderItem={({ item: habit, index }) => (
              <Animated.View entering={FadeInDown.delay(150 * index).duration(800).springify()} >
                <HabitsCard
                  habit={habit}
                  onComplete={handleCompleteHabit}
                  onDelete={handleDeleteHabit}
                  checkIsHabitCompleted={checkIsHabitCompleted}
                />
              </Animated.View>
            )}
            contentContainerStyle={{
              paddingTop: 12,
              paddingBottom: 120
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Center>
                <Text color="gray.300" fontSize="md" fontFamily="heading">
                  Nenhum hábito criado hoje ainda.
                </Text>
              </Center>
            )}
          />
        )}
      </>


      <HabitsFloatButton onPress={handleOpenModal} />
    </VStack>
  )
}