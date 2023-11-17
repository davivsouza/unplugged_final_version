import { HStack, Image, Pressable, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import GoBackSvg from "@assets/goback.svg";
import { imagesUrl } from "@utils/baseUrls";

type Props = {
  banner: string
}

export function PlaylistHeader({ banner }: Props) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigate() {
    navigate('binaural')
  }

  return (
    <VStack>

      <HStack alignItems="center" justifyContent="center" >
        <Pressable onPress={handleNavigate} position={'absolute'} left={-10} p={4}>
          <GoBackSvg fill="#fff" />
        </Pressable>
        <Text color="white" fontSize="2xl" fontFamily="heading" style={{
          elevation: 10
        }}>Relaxamento</Text>
      </HStack>
      <Image
        w="full"
        h={250}
        alignSelf="center" source={{ uri: `${imagesUrl}/${banner}` }}
        alt="Playlist Banner"
        mt={10}
        rounded="lg"
      />

    </VStack>


  )
}