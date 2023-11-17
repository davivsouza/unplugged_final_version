import { HabitsControlTimerAppBox } from "./HabitsControlTimerAppBox";
import { HStack, Modal, Pressable, Text, VStack, useTheme } from "native-base";
import { useGoals } from "@hooks/useGoals";
import GoBackSvg from "@assets/goback.svg";
import TikTokIcon from '@assets/habits/tiktok.png'
import SpotifyIcon from '@assets/habits/spotify-icon.svg'
import YoutubeIcon from '@assets/habits/youtube-icon.svg'
import InstagramIcon from '@assets/habits/instagram.png'
import TwitterIcon from '@assets/habits/twitter.png'
import { useState } from "react";
import { HabitsTimerInputModal } from "./HabitsTimerInputModal";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useTimerControl } from "@hooks/useTimerControl";

export type SelectedApp = {
  appName: string
  iconUrl: string
}
type Props = {
  isModalOpen: boolean
  onOpenModal: (status: boolean) => void
}

export function HabitsControlSetTimerModal({ isModalOpen, onOpenModal }: Props) {
  const [selectedApp, setSelectedApp] = useState<SelectedApp>({} as SelectedApp)
  const [isTimerInputModalOpen, setIsTimerInputModalOpen] = useState(false)
  const [getSeconds, setGetSeconds] = useState(0)
  const { saveAppTimer } = useTimerControl()
  const { colors } = useTheme()

  const initialHour = new Date();
  initialHour.setHours(0, 0, 0);

  function onChangeTimer(event: DateTimePickerEvent, selectedDate: Date | undefined) {

    if (event.type === 'set') {

      if (selectedDate) {
        const tempHour = selectedDate.getHours()
        const tempMin = selectedDate.getMinutes()
        const seconds = (tempHour * 3600) + (tempMin * 60)
        setIsTimerInputModalOpen(false)

        setGetSeconds(seconds)
        saveAppTimer({
          appName: selectedApp.appName,
          iconUrl: selectedApp.iconUrl,
          limitTime: seconds
        })
        setSelectedApp({} as SelectedApp)
        onOpenModal(false)

      }
    } else {
      setIsTimerInputModalOpen(false)
    }


  }



  function handleSelectedApp(app: SelectedApp) {

    setSelectedApp(app)
    setIsTimerInputModalOpen(true)

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
      {isTimerInputModalOpen && (
        <DateTimePicker
          testID="app_timer"
          minuteInterval={5}
          value={initialHour}
          is24Hour
          display="spinner"
          mode="time"
          accentColor="#000"
          onChange={onChangeTimer}
          negativeButton={{ label: 'Cancel', textColor: colors.purple[500] }}
          positiveButton={{ label: 'OK', textColor: colors.purple[500] }}
        />
      )}
      <VStack
        borderTopRadius="3xl"
        bg={{
          linearGradient: {
            colors: ["gray.800", "purple.800"],
            start: [0, 1],
            end: [0, 0],
          },
        }}
        py={20}
        px={6}
        width="full"
        height="100%"
        position="absolute"
        bottom={0}
        justifyContent="flex-start"

      >

        <HStack w="full" alignItems="center" justifyContent="center" mb={3} >
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
          <Text color="white" fontSize="2xl" fontFamily="heading">Novo Timer</Text>
        </HStack>
        <Text color="white" fontSize="2xl" fontFamily="semiBold" mt={12}>Apps mais usados</Text>
        <Text color="gray.200" fontSize="sm" fontFamily="body">
          Selecione um app e limite o tempo de uso dele.
        </Text>

        <VStack w="full" space={4} mt={3}>

          <HabitsControlTimerAppBox
            appName="TikTok"
            icon={TikTokIcon}
            selectedApp={selectedApp}
            onPress={() => handleSelectedApp({
              appName: 'TikTok',
              iconUrl: 'Tiktok'
            })}
          />
          <HabitsControlTimerAppBox
            appName="Twitter"
            icon={TwitterIcon}
            selectedApp={selectedApp}
            onPress={() => handleSelectedApp({
              appName: 'Twitter',
              iconUrl: 'Twitter'
            })}
          />
          <HabitsControlTimerAppBox
            appName="Instagram"
            icon={InstagramIcon}
            selectedApp={selectedApp}
            onPress={() => handleSelectedApp({
              appName: 'Instagram',
              iconUrl: 'Instagram'
            })}
          />

        </VStack>

        {/* <HabitsTimerInputModal isModalOpen={isTimerInputModalOpen} onOpenModal={setIsTimerInputModalOpen} /> */}
      </VStack>
    </Modal>
  )
}