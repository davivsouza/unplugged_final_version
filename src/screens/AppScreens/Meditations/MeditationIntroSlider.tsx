import { Image, PresenceTransition, Text, VStack, useTheme, Box, HStack } from "native-base";
import Carousel from 'react-native-app-intro-slider'
import { meditationScreenSlides } from '@utils/slides'
import { ScreenContainer } from "@components/ScreenContainer";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import ArrowRight from '@assets/arrow-right.svg'
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { introSliderStorageSave } from "../../../storage/storageIntroSlider";
export function MeditationIntroSlider() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  async function onDoneSlider() {
    await introSliderStorageSave({
      introSlider: 'meditation',
      watched: true
    })
    navigate('meditations')
  }


  return (
    <ScreenContainer>
      <Carousel
        data={meditationScreenSlides}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          item.title && item.text ? (
            <VStack flex={1} justifyContent="center" alignItems="center" mt={12}>
              <Image
                source={item.image}
                alt={item.title}
                resizeMode="cover"
                mb={6}
              />
              <Text fontSize="2xl" fontFamily="heading" mb={2} color="white">
                {item.title}
              </Text>
              <Text fontFamily="body" fontSize="sm" textAlign="center" color="white">
                {item.text}
              </Text>
            </VStack>
          ) : (
            <VStack mt={12}>
              <Box mb={20}>
                <Text fontSize="3xl" fontFamily="heading" color="white">
                  Bem vindo ao
                </Text>
                <Text fontSize="xl" fontFamily="body" mb={2} color="white">
                  Centro de meditações
                </Text>
                <HStack space={2} alignItems="flex-start">
                  <Text fontSize="md" fontFamily="body" mb={2} color="white" italic>
                    Vamos começar
                  </Text>
                  <AntDesign name="arrowright" size={24} color="white" />
                </HStack>
              </Box>


              <Image
                source={item.image}
                alt="Imagem do slide 1 de introdução"
                resizeMode="contain"
                mb={6}
              />
            </VStack>
          )
        )}
        contentContainerStyle={{
          position: "relative",
        }}
        dotStyle={{
          backgroundColor: '#fff',
          marginTop: 30,
        }}

        activeDotStyle={{
          backgroundColor: colors.purple[500],
          marginTop: 30,
        }}
        renderNextButton={() => (
          <Box
            alignItems={'center'}
            justifyContent={'center'}
            marginTop={20}
            backgroundColor="purple.500"
            rounded="full"
            w={12}
            h={12}
          >
            <ArrowRight fill="#fff" />
          </Box>
        )}
        renderDoneButton={() => (
          <PresenceTransition
            visible
            initial={{
              opacity: 0,
              translateX: 90,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 300,
              },
            }}
          >
            <Box
              alignItems={'center'}
              justifyContent={'center'}
              background="purple.500"
              rounded="full"
              w={12}
              h={12}
              marginTop={20}
            >
              <FontAwesome name="check" size={24} color="white" />
            </Box>
          </PresenceTransition>
        )}
        onDone={onDoneSlider}
      />
    </ScreenContainer >
  )
}