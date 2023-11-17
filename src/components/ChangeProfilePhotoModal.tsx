import { imagesUrl } from "@utils/baseUrls";
import { HStack, Image, Modal, VStack, Pressable, Text } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";


const imageMock = [
  {
    id: 1,
    name: 'monkey-god.jpg',
    url: `${imagesUrl}/monkey-god.jpg`
  },
  {
    id: 2,
    name: 'tech.jpg',
    url: `${imagesUrl}/tech.jpg`
  },
  {
    id: 3,
    name: 'woman.jpg',
    url: `${imagesUrl}/woman.jpg`
  },
]

type Props = {
  isModalOpen: boolean
  onCloseModal: (status: boolean) => void
  onChangeImgProfile: (img: string) => void
}
export function ChangeProfilePhotoModal({ isModalOpen, onChangeImgProfile, onCloseModal }: Props) {
  const [selectedImg, setSelectedImg] = useState('')

  function changePhoto() {
    onChangeImgProfile(selectedImg)
    onCloseModal(false)
  }

  function handleSelectedImg(img: string) {
    if (selectedImg === img) {
      setSelectedImg('')
    } else {
      setSelectedImg(img)
    }
  }
  return (
    <Modal
      isOpen={isModalOpen}
      justifyContent="center"
      alignItems="center"
      _backdrop={{
        bg: "black"
      }}
      onClose={() => onCloseModal(false)}
    >
      <VStack

        rounded="xl"
        bg={'purple.800'}
        py={8}
        px={6}
        width="90%"
        justifyContent="flex-start"
        alignItems="center"

      >
        <Text color="white" fontSize="lg" mb={10}>
          Selecione uma das imagens
        </Text>
        <HStack >
          {imageMock.map(image => (
            <Pressable
              key={image.id}
              w={20}
              h={20}
              mr={4}
              onPress={() => handleSelectedImg(image.name)}

              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                w={20}
                h={20}
                source={{ uri: `${image.url}` }}
                alt={image.name}
                rounded="full"
                borderWidth={selectedImg === image.name ? 2 : 0}
                borderColor={selectedImg === image.name ? 'purple.700' : 'transparent'}
              />
            </Pressable>
          ))}
        </HStack>
        <TouchableOpacity onPress={changePhoto} style={{ marginTop: 32 }}>
          <Text color="purple.500" fontSize="md">Trocar foto de perfil</Text>
        </TouchableOpacity>
      </VStack>
    </Modal>
  )
}