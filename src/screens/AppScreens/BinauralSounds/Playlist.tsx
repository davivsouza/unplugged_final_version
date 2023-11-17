import { BinauralSoundCard } from "@components/BinauralSoundCard";
import { PlaylistHeader } from "@components/PlaylistHeader";
import { ScreenContainer } from "@components/ScreenContainer";
import { Center, FlatList, ScrollView, Text } from "native-base";
import { BinauralCategoryDTO, BinauralDTO } from "../../../dtos/BinauralCategoryDTO";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Loading } from "@components/Loading";
type RouteParams = {
  playlistId: number
};


export function Playlist() {
  const route = useRoute();
  const [playlist, setPlaylist] = useState<BinauralCategoryDTO>({} as BinauralCategoryDTO)
  const { playlistId } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenSound, setIsOpenSound] = useState(false)

  function onOpenSound() {
    setIsOpenSound(true)
  }
  function onCloseSound() {
    setIsOpenSound(false)
  }

  async function getPlaylistById() {
    try {
      setIsLoading(true)
      const { data } = await api.get<BinauralCategoryDTO>(`/binaurals/listCategory/${playlistId}`)
      setPlaylist(data)
    } catch (err) {
      return;
    } finally {
      setIsLoading(false)
    }

  }
  useEffect(() => {

    getPlaylistById()
  }, [playlistId])



  return (
    <ScreenContainer >

      {isLoading && <Loading />}

      {!isLoading && (
        <>

          {!isOpenSound && <PlaylistHeader banner={playlist.images} />}
          <FlatList
            data={playlist.binaural}
            mt={isOpenSound ? 0 : 12}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <BinauralSoundCard
                binaural={item}
                playlistId={playlist.id}
                isOpenSound={isOpenSound}
                onOpenSound={onOpenSound}
                onCloseSound={onCloseSound}
              />
            )
            }
            ListEmptyComponent={() => (
              <Center>
                <Text color="white" fontSize="lg">Nenhum som binaural postado {':('}</Text>
              </Center>
            )}
          />
        </>
      )}




    </ScreenContainer>
  )
}