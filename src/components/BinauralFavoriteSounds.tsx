import { Box, HStack, Image, Pressable, Text, VStack, useTheme } from "native-base";
import BtnPlay from "@assets/binauralsounds/btnPlay.svg";
import { Foundation } from '@expo/vector-icons';
import { View } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { imagesUrl } from "@utils/baseUrls";
export function BinauralFavoriteSounds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { colors } = useTheme();

  const { favoritesBinauralSounds } = useAuth()

  function handleNavigate() {
    navigate('favoriteBinauralSounds')
  }


  return (

    <>
      {/* {isLoading && (
        <Box position="relative" h={220}>
          <Box
            w="full"
            bg="gray.500"
            h={220}
            rounded="xl"
            position="absolute"
            alignItems="center"
            justifyContent="center"
          />
          <Loading />
        </Box>
      )} */}
      {favoritesBinauralSounds.length > 0 && (
        <Box position="relative" h={220} >
          <VStack alignItems="center">
            <Image
              w="full"
              h={220}
              resizeMode="contain"
              rounded="xl"
              source={{ uri: `${imagesUrl}/${favoritesBinauralSounds[favoritesBinauralSounds.length - 1].binaural.binaural_img}` }}
              alt="Foto de perfil do usuário"
              position="absolute"
            />
            <View
              style={{
                width: "94%",
                height: 220,
                borderRadius: 10,
                backgroundColor: colors.gray[400],
                elevation: -1,
                position: "absolute",
                top: 12,
              }}
            />
            <View
              style={{
                width: "89%",
                height: 220,
                borderRadius: 10,
                backgroundColor: colors.gray[600],
                elevation: -2,
                position: "absolute",
                top: 22,
              }}
            />
          </VStack>
          <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            height="full"
            width="full"
            rounded="xl"

            borderBottomLeftRadius="xl"
            borderBottomRightRadius="xl"
            position="absolute"
            bg="rgba(0, 0, 0, 0.7)"
            py={1}
            px={5}
            pb={12}
          >
            <VStack flex={1}>
              <Text color="white" fontFamily="semiBold" fontSize="2xl">
                Sons favoritados
              </Text>
              <Text color="white" fontFamily="body" fontSize="sm">
                veja todos os seus sons favoritos

              </Text>
            </VStack>
            <Pressable onPress={handleNavigate}>
              <BtnPlay width={45} height={45} />
            </Pressable>
          </HStack>
        </Box>
      )}
      {favoritesBinauralSounds.length === 0 && (
        <Box position="relative" h={220}>
          <VStack alignItems="center">
            <Box
              w="full"
              bg="gray.500"
              h={220}
              rounded="xl"
              position="absolute"
              alignItems="center"
              justifyContent="center"
            >
              <Foundation name="music" size={90} color="white" style={{
                marginBottom: 50,
              }} />
            </Box>
          </VStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            bottom={-0.5}
            height={75}
            width="full"
            borderBottomLeftRadius="xl"
            borderBottomRightRadius="xl"
            position="absolute"
            bg="rgba(0, 0, 0, 0.6)"
            py={1}
            px={5}
          >
            <VStack flex={1}>
              <Text color="white" fontFamily="semiBold" fontSize="lg" textAlign="center">
                Nenhum som favoritado!
              </Text>
            </VStack>

          </HStack>
        </Box>
      )}
    </>


  )
}