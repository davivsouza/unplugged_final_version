import {
  HStack,
  Pressable,
  Text,
  VStack,
  Box,
  Image,
  useTheme,
  ScrollView,
  FlatList,
  Center,
} from "native-base";
import { View } from "react-native";

import { PlaylistCard } from "@components/PlaylistCard";
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BinauralCategoryDTO } from "../dtos/BinauralCategoryDTO";
import { api } from "../services/api";
import { BinauralFavoriteSounds } from "./BinauralFavoriteSounds";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "./Loading";
import Animated, { FadeInDown } from "react-native-reanimated";


export function BinauralContent() {

  const [binaurals, setBinaurals] = useState<BinauralCategoryDTO[]>()
  const { getFavoriteBinauralSounds } = useAuth()
  const [isFetching, setIsFetching] = useState(false)
  async function fetchBinauralSounds() {
    try {
      setIsFetching(true)
      getFavoriteBinauralSounds()
      const { data } = await api.get('/binaurals/listCategory')
      setBinaurals(data)
    } catch (err) {
      throw err
    } finally {
      setIsFetching(false)
    }

  }



  useEffect(() => {
    fetchBinauralSounds();


  }, [])



  return (
    <VStack>
      <HStack justifyContent="center" alignItems="center">

        <Text color="white" fontFamily="semiBold" fontSize="3xl">
          Binaural Beats
        </Text>
      </HStack>
      <Text color="white" fontFamily="semiBold" fontSize="xl" mt={8} mb={4}>
        Seus beats favoritos
      </Text>
      <BinauralFavoriteSounds />
      <Text color="white" fontFamily="semiBold" fontSize="lg" mt={12}>Playlists</Text>
      {isFetching && <Loading />}
      {!isFetching && (
        <FlatList
          data={binaurals}
          mt={2}
          height={250}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (

            <PlaylistCard playlistId={item.id} title={item.name} beatsQuantity={item.binaural.length} imgUrl={item.images} />
          )
          }
          contentContainerStyle={{
            paddingBottom: 90
          }}
          ListEmptyComponent={() => (
            <Center>
              <Text color="white" fontSize="lg">Nenhum som binaural postado ainda. </Text>
            </Center>
          )}
        />
      )}

    </VStack>
  )
}