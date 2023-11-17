import { Box, VStack, Slider, Text, Image, HStack, Pressable, PresenceTransition, useTheme } from "native-base";
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AudioPlayerButton } from "@components/AudioPlayerButton";
import { BackHandler } from 'react-native';
import { formatTime } from "@utils/formatTime";
import { Audio } from 'expo-av'
import GoBackSvg from "@assets/goback.svg";
import { BinauralDTO } from "../dtos/BinauralCategoryDTO";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { api } from "../services/api";
import { imagesUrl, localUrl } from "@utils/baseUrls";


type Props = {
  binaural: BinauralDTO
  onCloseSound: () => void

}


export function BinauralSound({ binaural, onCloseSound }: Props) {

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [position, setPosition] = useState<number | null>(null);
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const route = useRoute()

  const { user, favoritesBinauralSounds, getFavoriteBinauralSounds } = useAuth()
  const { colors } = useTheme()

  async function favoritedSound(id: number) {
    if (isFavorited(id)) {
      await api.delete(`binaurals/unfavorite/${user.id}/${binaural.id}`)
      getFavoriteBinauralSounds()
    } else {
      await api.post('binaurals/favorite', {
        userId: user.id,
        binauralId: binaural.id
      })
      getFavoriteBinauralSounds()
    }
  }
  function isFavorited(id: number) {
    return favoritesBinauralSounds.some(sound => sound.binauralId === id)
  }

  async function handleNavigate() {
    onCloseSound()
  }

  const playTrack = async () => {
    if (sound) {
      setIsPlaying(true);
      await sound.playAsync();
    }
  };

  const pauseTrack = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const onSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
    setPosition(value);
  };


  async function loadAudio() {
    try {

      setIsLoading(true)
      const { sound } = await Audio.Sound.createAsync({ uri: `${localUrl}/api/binaurals/${binaural.id}` });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
          setIsPlaying(status.isPlaying);
          if (status.didJustFinish) {
            await sound.unloadAsync()
          }

        }

      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };



  useFocusEffect(useCallback(() => {
    loadAudio()
  }, []))

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
        setSound(null)
      }
      : undefined;
  }, [sound]);

  return (
    <>
      {isLoading ? <Loading /> : (
        <>
          <HStack alignItems="center" justifyContent="center" mb={10}>
            <Pressable
              py={3}
              pr={8}
              alignItems="center"
              position={'absolute'}
              left={0}
              justifyContent="center"
              onPress={handleNavigate}>
              <GoBackSvg fill="#fff"
              />
            </Pressable>
            <Text color="white" fontSize="2xl" fontFamily="heading" style={{
              elevation: 10
            }}>Sons Binaurais</Text>
          </HStack>
          <Box justifyContent="center" flex={1} alignItems="center" mt={3} px={2}>
            <VStack mb={5}>
              <Image source={{ uri: `${imagesUrl}/${binaural.binaural_img}` }} alt="Banner do áudio" w="300" height="300" rounded="xl" mb={4} />
              <HStack alignItems="center" justifyContent="space-between">

                <Text color="white" fontSize="lg" fontFamily="semiBold">
                  {binaural.binaural_name}
                </Text>
                <Pressable onPress={() => favoritedSound(binaural.id)}>
                  {
                    isFavorited(binaural.id)
                      ? (
                        <PresenceTransition
                          visible={isFavorited(binaural.id)}
                          initial={{
                            opacity: 0.5,
                            scale: 0
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                              duration: 220
                            }
                          }}
                        >
                          <AntDesign name={'heart'} size={30} color={colors.red[500]} />
                        </PresenceTransition>)
                      : <AntDesign name={'hearto'} size={30} color={colors.gray[300]} />
                  }

                </Pressable>
              </HStack>
              <Text color="gray.300" fontFamily="body" fontSize="xs">{binaural.binaral_autor}</Text>


            </VStack>
            <Slider
              rounded="xl"
              w="95%"
              value={position || 0}
              onChange={onSliderValueChange}
              minValue={0}
              maxValue={duration}
              step={1000}
              colorScheme="gray"
              borderColor="red.400"
            >
              <Slider.Track bg="purple.900">
                <Slider.FilledTrack bg={{
                  linearGradient: {
                    colors: ["purple.500", "purple.700"],
                    start: [1, 0],
                    end: [0.3, 1],
                  },
                }} />
              </Slider.Track>
              <Slider.Thumb w={0} bg="transparent" outlineStyle="none" >
                <Box w={3} h={3} rounded="full" bg="purple.500" borderWidth={2} borderColor="white" />
              </Slider.Thumb>
            </Slider>
            <HStack w="95%" justifyContent="space-between" mb={2}>
              <Text color="gray.300" fontSize="xs" fontFamily="body">
                {`${formatTime(Math.floor(position! / 1000))}`}
              </Text>
              <Text color="gray.300" fontSize="xs" fontFamily="body">
                {`${formatTime(Math.floor(duration! / 1000))}`}

              </Text>
            </HStack>

            {isPlaying ? (
              <AudioPlayerButton
                color="white"
                bg="purple.500"
                onPress={pauseTrack}
                shadow={9}
                style={{
                  elevation: 10,
                }} >
                <AntDesign name="pause" size={50} color="white" />
              </AudioPlayerButton>
            ) : (
              <AudioPlayerButton
                color="white"
                bg="purple.500"
                onPress={playTrack}
                pl={2}
                shadow={9}
                style={{
                  elevation: 10,
                }} >
                <Entypo name="controller-play" size={60} color="white" />
              </AudioPlayerButton>
            )}
          </Box>
        </>)}
    </>


  )
}