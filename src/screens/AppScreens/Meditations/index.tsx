import { MeditationCategory } from '@components/MeditationCategory'
import { VStack, Text, HStack, Image, FlatList, ScrollView, Center, useToast } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { meditationsCategories, meditationTimeDurations } from '../../../utils/meditationsCategories'
import { MeditationTimeDurationCategory } from '@components/MeditationTimeDurationCategory'
import { MeditationCard } from '@components/MeditationCard'
import { ScreenContainer } from '@components/ScreenContainer'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useAuth } from '@hooks/useAuth'
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../../services/api'
import { MeditationDTO } from '../../../dtos/MeditationDTO'
import { formatTime } from '@utils/formatTime'
import { introSlidersGetAll } from '../../../storage/storageIntroSlider'
import { Loading } from '@components/Loading'
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
export function Meditations() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTimeDuration, setSelectedTimeDuration] = useState(0)
  const [meditations, setMeditations] = useState<MeditationDTO[]>([])
  const [showRealApp, setShowRealApp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()
  const toast = useToast()

  async function checkIfUserHasAlreadySeenTheIntroSlider() {
    const slidersThatUserHasWatched = await introSlidersGetAll()
    const filter = slidersThatUserHasWatched.filter(slider => slider.introSlider === 'meditation' && slider.watched)

    if (filter.length > 0) {
      if (filter[0].watched) {

        navigate('meditations')
      }
    } else {
      navigate('meditationIntroSlider')
    }

  }



  async function handleSelectedCategory(category: string) {
    try {

      if (selectedCategory === category) {

        setSelectedCategory('')
        if (selectedTimeDuration) {
          const { data } = await api.get<MeditationDTO[]>('/meditations/')
          const filtered = data.filter(meditation => Math.round(meditation.meditation_duration / 60) >= selectedTimeDuration && Math.round(meditation.meditation_duration / 60) < selectedTimeDuration + 5)
          setMeditations(filtered)
          return;
        }
        fetchMeditations()
      } else {
        setSelectedCategory(category)
        setIsLoading(true)
        const { data } = await api.get<MeditationDTO[]>('/meditations/')
        const filtered = data.filter(meditation => meditation.meditation_category.name === category)
        setMeditations(filtered)
      }

    } catch (error) {
      toast.show({
        title: 'Erro ao selecionar categoria.',
        placement: 'top',
        bgColor: 'red.500',

      })
    } finally {
      setIsLoading(false)
    }

  }
  async function handleSelectedTimeDuration(timeDuration: number) {
    try {
      if (selectedTimeDuration === timeDuration) {
        setSelectedTimeDuration(0)
        fetchMeditations()
        if (selectedCategory) {
          const { data } = await api.get<MeditationDTO[]>('/meditations/')
          const filtered = data.filter(meditation => meditation.meditation_category.name === selectedCategory)
          setMeditations(filtered)
        }
      } else {
        if (selectedCategory) {
          setSelectedTimeDuration(timeDuration)
          setIsLoading(true)
          const { data } = await api.get<MeditationDTO[]>('/meditations/')
          const filtered = data.filter(meditation => meditation.meditation_category.name === selectedCategory && Math.round(meditation.meditation_duration / 60) >= timeDuration && Math.round(meditation.meditation_duration / 60) < timeDuration + 5)
          setMeditations(filtered)
        } else {
          setSelectedTimeDuration(timeDuration)
          const { data } = await api.get<MeditationDTO[]>('/meditations/')
          const filtered = data.filter(meditation => Math.round(meditation.meditation_duration / 60) >= timeDuration && Math.round(meditation.meditation_duration / 60) < timeDuration + 5)
          setMeditations(filtered)
        }
      }
    } catch (error) {
      toast.show({
        title: 'Erro ao selecionar categoria.',
        placement: 'top',
        bgColor: 'red.500',

      })
    } finally {
      setIsLoading(false)
    }


  }



  async function fetchMeditations() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/meditations/')
      setMeditations(data)
    } catch (error) {
      toast.show({
        title: 'Meditações não encontradas',
        placement: 'top',
        bgColor: 'red.500',

      })
    } finally {
      setIsLoading(false)
    }

  }
  useEffect(() => {
    checkIfUserHasAlreadySeenTheIntroSlider()
    fetchMeditations()
    setSelectedCategory('')
    setSelectedTimeDuration(0)
  }, [])


  return (
    <ScreenContainer>

      <VStack>
        <Animated.View entering={FadeInLeft.delay(100).duration(1000).springify()} >
          <Text color="white" fontFamily="semiBold" fontSize="3xl" textAlign="center">
            Meditações
          </Text>
        </Animated.View>
      </VStack>

      <VStack>
        <FlatList
          height={170}
          data={meditationsCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.category}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(100 * index).duration(500).springify()}>
              <MeditationCategory
                category={item.category}
                label={item.text}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectedCategory}
              />
            </Animated.View>
          )}
        />
        <FlatList
          data={meditationTimeDurations}
          horizontal
          contentContainerStyle={{
            paddingVertical: 10
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.label}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(100 * index).duration(500).springify()}>

              <MeditationTimeDurationCategory
                timeDuration={item.timeInMinutes}
                onSelectTimeDuration={handleSelectedTimeDuration}
                selectedTimeDuration={selectedTimeDuration}
              />
            </Animated.View>
          )}
        />
      </VStack>
      {isLoading ? <Loading /> : (
        <FlatList
          data={meditations}
          mt={12}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(100 * index).duration(500).springify()}>
              <MeditationCard
                meditation={item}
              />
            </Animated.View>
          )

          }
          ListEmptyComponent={() => (
            <Center>
              <Text color="white" fontSize="lg">Nenhuma meditação encontrada.</Text>
            </Center>
          )}
        />
      )}

    </ScreenContainer>
  )
}