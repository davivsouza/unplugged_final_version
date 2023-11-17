import { ScreenContainer } from "@components/ScreenContainer";
import { Box, Divider, HStack, Image, Pressable, Text, VStack, useTheme } from "native-base";
import { useAuth } from "@hooks/useAuth";
import { AntDesign, Feather } from '@expo/vector-icons'
import { ProfileOption } from "@components/ProfileOption";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { imagesUrl } from "@utils/baseUrls";
export function Profile() {
  const { user, signOut } = useAuth()
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  return (
    <ScreenContainer>
      <Animated.View entering={FadeInUp.delay(100).duration(500)}>

        <Text textAlign="center" color="white" fontSize="2xl" fontFamily="heading" style={{
          elevation: 10
        }}>Meu Perfil</Text>
      </Animated.View>
      <VStack alignItems={'center'} mt={8}>
        <Animated.View entering={FadeInUp.delay(300).duration(500)}>
          {user.img_user && <Image
            w={32}
            h={32}
            mb={4}
            source={{ uri: `${imagesUrl}/${user.img_user}` }}
            alt={user.name}
            rounded="full"
          />}
          {/* {user.img_user === null && (
            <Box p={2} rounded='full' bg="gray.400" my={8}>
              <AntDesign name="user" size={80} color="white" />
            </Box>
          )} */}
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(400).duration(500)}>

          <Text textAlign='center' fontFamily='body' fontSize={'xl'} color="white">{user.name}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(500)}>
          <Text textAlign='center' fontFamily='body' fontSize={'sm'} color="gray.400">@{user.nickname}</Text>
        </Animated.View>
      </VStack>
      <Animated.View entering={FadeInUp.delay(600).duration(500)}>
        <Button title="Editar perfil" w="50%" alignSelf="center" my={6} onPress={() => navigate('updateProfile')} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <VStack my={8} px={2} py={4}>
          <ProfileOption icon="hearto" label="Sons favoritos" screen="favoriteSounds" />
          {/* <ProfileOption icon="download" label="Baixados" /> */}
          <Divider mt={3} mb={5} />
          <Pressable onPress={signOut}>
            <HStack alignItems={'center'} space={2}>
              <Feather name="log-out" size={25} color={colors.red[500]} />
              <Text fontFamily='body' fontSize={'lg'} color="red.500">Sair</Text>
            </HStack>
          </Pressable>
        </VStack>
      </Animated.View>

    </ScreenContainer>
  )
}