import { ImageBackground } from 'react-native'
import { MeditationDTO } from '../../../dtos/MeditationDTO'
import { Box, VStack, Slider, Text, Image, HStack, Pressable, Button } from "native-base";
import { useCallback, useEffect, useState } from 'react'
import { BackHandler } from 'react-native';
import { Audio } from 'expo-av'
import { formatTime } from "@utils/formatTime";
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons'
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import DotMenuSvg from '@assets/binauralsounds/dotmenu-icon.svg'
import GoBackSvg from "@assets/goback.svg";
import { AudioPlayerButton } from "@components/AudioPlayerButton";
import { Loading } from "@components/Loading";
import { api } from "../../../services/api";
import { imagesUrl, localUrl } from '@utils/baseUrls';

export function MeditationPlayer() {
  const route = useRoute()

  const meditation = route.params as MeditationDTO




  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [position, setPosition] = useState<number | null>(null);
  const { goBack } = useNavigation<AppNavigatorRoutesProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>('')


  async function handleNavigate() {
    if (sound) {
      await sound.stopAsync()
      await sound.unloadAsync()
      setAudioUrl('')
      goBack();
    }
  }



  const playTrack = async () => {
    await sound?.playAsync();
    setIsPlaying(true);
  };

  const pauseTrack = async () => {
    await sound?.pauseAsync();
    setIsPlaying(false);
  };

  const onSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
    setPosition(value);
  };


  async function handleSkipForward() {
    if (sound && position) {
      const newPosition = position + 15000
      try {
        await sound.setPositionAsync(newPosition)
        setPosition(newPosition)
      } catch (error) {
        return
      }
    }
  }
  async function handleRewind() {
    if (sound && position) {
      const newPosition = position - 15000
      try {
        await sound.setPositionAsync(newPosition)
        setPosition(newPosition)
      } catch (error) {
        return
      }
    }
  }
  async function loadAudio() {
    try {
      setIsLoading(true)
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
          setIsPlaying(status.isPlaying);
          if (status.didJustFinish) {
            sound.setPositionAsync(0)
            sound.pauseAsync()
          }
        }
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (audioUrl) {
        loadAudio();
      }
      function onBackPress() {
        return true
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [audioUrl])
  );

  useEffect(() => {
    const idUrl = `${localUrl}/api/meditations/${meditation.id}`
    setAudioUrl(idUrl)
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [meditation]);

  return (
    <>
      {isLoading ? <Loading /> : (
        <ImageBackground source={{ uri: `${imagesUrl}/${meditation.meditation_img}` }} blurRadius={7} resizeMode='cover' style={{
          flex: 1,
        }}>
          <VStack
            flex={1}
            py={90}
            px={5}
            space={40}
          >
            <HStack alignItems="center" justifyContent="center" >
              <Pressable
                py={3}
                pr={8}
                pl={2}
                alignItems="center"
                justifyContent="center"
                position={'absolute'}
                left={0}
                onPress={handleNavigate}
              >
                <GoBackSvg fill="#fff" />
              </Pressable>
              <Text color="white" fontSize="2xl" fontFamily="heading" style={{
                elevation: 10
              }}>Meditação</Text>
            </HStack>
            <Box justifyContent="center" flex={1} alignItems="center" mt={3}>
              <VStack mb={5}>
                <Image source={{ uri: `${imagesUrl}/${meditation.meditation_img}` }} alt="Banner do áudio" w="300" height="300" rounded="xl" mb={4} />
                <Text color="white" fontSize="lg" fontFamily="semiBold">
                  {meditation.meditation_name}
                </Text>
                <Text color="gray.300" fontSize="xs" fontFamily="body">
                  Feito por {meditation.Meditation_autor}
                </Text>
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
                <Slider.Track bg="gray.300">
                  <Slider.FilledTrack bg="white" />
                </Slider.Track>
              </Slider>
              <HStack w="95%" justifyContent="space-between" mb={8}>
                <Text color="gray.300" fontSize="xs" fontFamily="body">
                  {`${formatTime(Math.floor(position! / 1000))}`}
                </Text>
                <Text color="gray.300" fontSize="xs" fontFamily="body">
                  {isLoading ? '00:00' : `${formatTime(Math.floor(duration! / 1000))}`}

                </Text>
              </HStack>
              <HStack alignItems="center" space={12}>
                <Pressable onPress={handleRewind}>
                  <MaterialCommunityIcons name="rewind-15" size={30} color="white" />
                </Pressable>

                {isPlaying ? (
                  <AudioPlayerButton
                    bg="white"
                    onPress={pauseTrack}
                    shadow={9}
                    style={{
                      elevation: 10,
                    }} >
                    <AntDesign name="pause" size={50} color="black" />
                  </AudioPlayerButton>
                ) : (
                  <AudioPlayerButton
                    bg="white"
                    onPress={playTrack}
                    alignItems="center"
                    justifyContent="center"
                    pl={2}
                    shadow={9}
                    style={{
                      elevation: 10,
                    }} >
                    <Entypo name="controller-play" size={60} color="black" />
                  </AudioPlayerButton>)
                }
                <Pressable onPress={handleSkipForward}>
                  <MaterialCommunityIcons name="fast-forward-15" size={30} color="white" />
                </Pressable>
              </HStack>
            </Box>
          </VStack>
        </ImageBackground>
      )}
    </>
  )
}