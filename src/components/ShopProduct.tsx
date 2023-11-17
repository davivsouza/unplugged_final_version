import { Box, HStack, Image, Pressable, Text, VStack, useTheme } from "native-base";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import ShopProductMock from '@assets/shop/shopmock.png'
import { CartAddModal } from "./CartAddModal";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";


export function ShopProduct() {
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleOpenModal() {

    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
    }, 1500)
  }
  return (
    <VStack w={170} bg='gray.500' rounded="2xl" mt={6} overflow="hidden" p={4}>
      <CartAddModal isModalOpen={showModal} />
      <HStack justifyContent="space-between">

        <Box bg="green.500" rounded="xl" w={12} justifyContent="center" alignItems="center">
          <Text color="white" textAlign="center" fontSize="xs" fontFamily="body" >
            28%
          </Text>
        </Box>
        <Pressable onPress={handleOpenModal}>
          <Feather name="heart" size={24} color={colors.gray[300]} />
        </Pressable>
      </HStack>
      <Pressable onPress={() => navigation.navigate('product')}>
        <Image
          w={120}
          h={120}
          source={ShopProductMock}
          alt="Produto da loja do aplicativo"
          alignSelf="center"
        />
        <Text color="white" textAlign="center" fontSize="sm" fontFamily="body" >
          Hello Brain 30 dias
        </Text>
        <HStack alignItems="center" justifyContent="center" space={2}>
          <Text color="white" fontSize="sm" fontFamily="body" >
            R$ 25,90
          </Text>
          <Text color="gray.100" fontSize="xs" fontFamily="body" textDecorationLine="line-through">
            R$ 35,90
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  )
}