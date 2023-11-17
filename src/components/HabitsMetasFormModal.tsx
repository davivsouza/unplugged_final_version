import GoBackSvg from "@assets/goback.svg";
import { HStack, Modal, Pressable, Select, Text, TextArea, VStack, useToast } from "native-base";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useGoals } from "@hooks/useGoals";
import { useAuth } from "@hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { api } from "../services/api";
import { useNotification } from "@hooks/useNotification";
import { AppError } from "@utils/AppError";
import dayjs from 'dayjs'
import "dayjs/locale/pt-br"
const daysOfWeek = [
  {
    dayNumber: 0,
    day: 'Dom'
  },
  {
    dayNumber: 1,
    day: 'Seg'
  },
  {
    dayNumber: 2,
    day: 'Ter'
  },
  {
    dayNumber: 3,
    day: 'Qua'
  },
  {
    dayNumber: 4,
    day: 'Qui'
  },
  {
    dayNumber: 5,
    day: 'Sex'
  },
  {
    dayNumber: 6,
    day: 'Sáb'
  },

]

const currentDayOfWeek = Number(dayjs().day())


type Props = {
  isModalOpen: boolean
  onOpenModal: (status: boolean) => void
}

type CreateHabitsFormDataProps = {
  name: string
  daysOfWeek: number[]
  description: string
  color: string
}

export function HabitsMetasFormModal({ isModalOpen, onOpenModal }: Props) {
  const { user } = useAuth()
  const { scheduleHabitsReminderNotification } = useNotification()
  const { loadTodayHabits } = useGoals()
  const [selectedDays, setSelectedDays] = useState<number[]>([currentDayOfWeek])
  const [isCreating, setIsCreating] = useState(false)
  const [color, setColor] = useState('white')
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateHabitsFormDataProps>()


  function selectDay(day: number) {
    const selectedDaysFiltered = selectedDays ? [...selectedDays] : [];
    let selectedDayWithRemovedDay = []

    if (selectedDaysFiltered.includes(day)) {
      selectedDayWithRemovedDay = selectedDaysFiltered.filter(dayNumber => dayNumber != day)
      setSelectedDays(selectedDayWithRemovedDay)

    } else {
      selectedDaysFiltered.push(day)
      const sortSelectedDays = selectedDaysFiltered.sort((a, b) => Number(a) - Number(b))
      setSelectedDays(sortSelectedDays)
    }
  }

  function handleSelectedColor(color: string) {
    setColor(color)
  }

  async function handleCreateHabit(habitData: CreateHabitsFormDataProps) {
    try {
      setIsCreating(true)

      const habit = {
        ...habitData,
        userId: user.id,
        color,
        daysOfWeek: selectedDays
      }
      await api.post('/habits', habit);
      toast.show({
        title: 'Hábito criado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',

      })

      loadTodayHabits()
      onOpenModal(false)
      setSelectedDays([currentDayOfWeek])
      setColor('white')
      reset()


    } catch (error) {
      setIsCreating(false);

      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível criar o hábito.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsCreating(false)
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      justifyContent="center"
      alignItems="center"
      _backdrop={{
        bg: "black"
      }}
      onClose={() => onOpenModal(false)}
    >
      <VStack

        borderTopRadius="3xl"
        bg={"#16141C"}
        py={8}
        px={6}
        width="full"
        height="93%"
        position="absolute"
        bottom={0}
        justifyContent="flex-start"
        alignItems="center"

      >

        <HStack w="full" alignItems="center" justifyContent="center" mb={12} >
          <Pressable
            py={3}
            pr={8}
            onPress={() => onOpenModal(false)}
            position='absolute'
            alignItems="center"
            justifyContent="center"
            left={0}>
            <GoBackSvg fill="#fff" />
          </Pressable>
          <Text color="white" fontSize="2xl" fontFamily="heading">Novo Hábito</Text>
        </HStack>

        <VStack mt={6} w="full" flex={1} justifyContent="space-between">
          <VStack space={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  w="full"
                  rounded="2xl"
                  bg="transparent"
                  color="white"
                  borderColor="white"
                  placeholder="Nome do hábito"
                  placeholderTextColor="white"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                  value={value}
                />
              )}
            />


            <HStack alignItems={'center'} space={2} justifyContent={'center'}>
              {daysOfWeek.map(item => (
                <Pressable
                  key={item.day}
                  flex={1}
                  h={12}
                  rounded="full"
                  borderColor={selectedDays?.includes(item.dayNumber) ? 'purple.500' : 'white'}
                  borderWidth={2}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onPress={() => selectDay(item.dayNumber)
                  }
                >
                  <Text
                    color={selectedDays?.includes(item.dayNumber) ? 'purple.500' : 'white'}
                    fontSize='sm'
                    textAlign={'center'}
                  >
                    {item.day}
                  </Text>
                </Pressable>
              ))}
            </HStack>
            {/* <Select
              w="full"
              h={12}
              rounded="2xl"
              color="white"
              bg="transparent"
              borderWidth={2}
              borderColor="white"
              placeholder="Diariamente"
              placeholderTextColor="white"
              fontSize="md"
              fontFamily="body"
              my={4}
              accessibilityLabel="Escolha um tipo de repetição"
              _actionSheetContent={{
                bg: "gray.700",
              }}
              _actionSheetBody={{
                bg: 'gray.700',
              }}

              _item={{
                bg: 'gray.700',

                _text: {
                  color: 'white',
                },
                _pressed: {
                  bg: 'gray.500',
                  _text: {
                    color: 'red.500'
                  }
                },
              }}
              dropdownIcon={
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24} color="white"
                  style={{ marginRight: 12 }}
                />
              }
              dropdownOpenIcon={
                <MaterialIcons
                  name="arrow-drop-up"
                  size={24} color="white"
                  style={{ marginRight: 12 }}
                />
              }

            >
              <Select.Item label="Diariamente" value="daily" />
              <Select.Item label="Semanalmente" value="weekly" />
              <Select.Item label="Mensal" value="monthly" />
              <Select.Item label="Não se repete" value="notRepeat" />
            </Select> */}



            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  w="full"
                  h={40}
                  rounded="2xl"
                  color="white"
                  bg="transparent"
                  borderWidth={2}
                  borderColor="white"
                  placeholder="Adicionar uma descrição"
                  placeholderTextColor="white"
                  fontSize="md"
                  fontFamily="body"
                  my={4}
                  p={4}
                  autoCompleteType="off"
                  _focus={{
                    bg: "transparent",
                    borderColor: 'purple.500',
                    _android: {
                      selectionColor: 'purple.500'
                    }
                  }}
                  onChangeText={onChange}
                  value={value}
                />

              )}
            />


            <Text color={'white'} fontSize={'lg'}>Escolha a cor do hábito:</Text>
            <HStack alignItems={'center'} justifyContent={'space-around'} mt={4}>
              <Pressable
                w={12}
                h={12}
                bg="purple.500"
                rounded='full'
                borderWidth={color === 'purple.500' ? 2 : 0}
                borderColor={color === 'purple.500' ? 'white' : 'transparent'}
                onPress={() => handleSelectedColor('purple.500')}
              />
              <Pressable
                w={12}
                h={12}
                bg="red.500"
                rounded='full'
                borderWidth={color === 'red.500' ? 2 : 0}
                borderColor={color === 'red.500' ? 'white' : 'transparent'}
                onPress={() => handleSelectedColor('red.500')}
              />
              <Pressable
                w={12}
                h={12}
                bg="green.500"
                rounded='full'
                borderWidth={color === 'green.500' ? 2 : 0}
                borderColor={color === 'green.500' ? 'white' : 'transparent'}
                onPress={() => handleSelectedColor('green.500')}
              />
            </HStack>

          </VStack>



          <Button title="Adicionar" mt={8} onPress={handleSubmit(handleCreateHabit)} isLoading={isCreating} />
        </VStack>
      </VStack>
    </Modal>
  )
}