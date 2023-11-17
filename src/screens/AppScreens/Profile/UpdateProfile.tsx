import GoBackSvg from "@assets/goback.svg";
import { ScreenContainer } from "@components/ScreenContainer";
import { Box, HStack, Image, Pressable, Text, VStack, useToast } from "native-base";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from '@expo/vector-icons'
import { Input } from "@components/Input";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { useState } from "react";
import { ChangeProfilePhotoModal } from "@components/ChangeProfilePhotoModal";
import { imagesUrl } from "@utils/baseUrls";
import { UserDTO } from "../../../dtos/UserDTO";


type UpdateFormDataProps = {
  name: string
  nickname: string
  email: string
  img_user: string
}

export function UpdateProfile() {
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { user, updateUserProfile } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imgName, setImgName] = useState(user.img_user)
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormDataProps>({
    defaultValues: {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      img_user: imgName,
    },
  });

  function handleOpenModal() {
    setShowModal(true)
  }



  async function handleUpdateUser(data: UpdateFormDataProps) {
    try {
      setIsUpdating(true)
      const updatedUser = user;
      updatedUser.name = data.name
      updatedUser.email = data.email
      updatedUser.nickname = data.nickname
      updatedUser.img_user = imgName


      await api.put('/users/update', {
        name: updatedUser.name,
        email: updatedUser.email,
        img_user: updatedUser.img_user,
        nickname: updatedUser.nickname
      })
      await updateUserProfile(updatedUser)
      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',

      })
    } catch (err) {

    } finally {
      setIsUpdating(false)
      goBack()
    }
  }
  return (
    <ScreenContainer>
      <ChangeProfilePhotoModal onChangeImgProfile={setImgName} isModalOpen={showModal} onCloseModal={setShowModal} />
      <HStack alignItems="center" justifyContent="center" >
        <Pressable onPress={() => goBack()} position={'absolute'} left={-10} p={4}>
          <GoBackSvg fill="#fff" />
        </Pressable>
        <Text color="white" fontSize="2xl" fontFamily="heading" style={{
          elevation: 10
        }}>Editando Perfil</Text>
      </HStack>
      <VStack alignItems={'center'} mt={8}>
        <Box position="relative">
          {imgName && <Image
            w={32}
            h={32}
            mb={4}
            source={{ uri: `${imagesUrl}/${imgName}` }}
            alt={user.name}
            rounded="full"
          />}
          <Pressable
            position="absolute"
            bottom={5}
            right={0}
            bg="purple.500"
            w={8}
            h={8}
            rounded="full"
            justifyContent="center"
            alignItems="center"
            onPress={handleOpenModal}
          >
            <AntDesign name="edit" size={15} color="white" />
          </Pressable>
        </Box>
        {/* {imgName === null && (
          <Box p={2} rounded='full' bg="gray.400" my={4} position="relative">
            <AntDesign name="user" size={80} color="white" />
            <Pressable
              position="absolute"
              bottom={0}
              right={0}
              bg="purple.500"
              w={8}
              h={8}
              rounded="full"
              justifyContent="center"
              alignItems="center"
              onPress={handleOpenModal}
            >
              <AntDesign name="edit" size={15} color="white" />
            </Pressable>
          </Box>
        )} */}

      </VStack>
      <Text color="white" fontSize="xl" fontFamily="semiBold" mt={6} mb={4}>Suas informações</Text>
      <VStack position="relative">
        <Text color="gray.100" fontSize="xs" fontFamily="body" position={'absolute'} top={5} left={3}>Nome completo</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              h='auto'
              pt={4}
              autoCapitalize="words"
              placeholderTextColor="gray.300"
              color='white'
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              value={value}
            />
          )}
        />

      </VStack>

      <VStack position="relative">
        <Text color="gray.100" fontSize="xs" fontFamily="body" position={'absolute'} top={5} left={3}>Nome de usuário</Text>

        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, value } }) => (
            <Input
              pt={4}
              h="auto"
              placeholder="Nome de usuário"
              autoCapitalize="words"
              placeholderTextColor="gray.300"
              color='white'
              onChangeText={onChange}
              value={value}
              errorMessage={errors.nickname?.message}
            />
          )}
        />
      </VStack>
      <VStack position={'relative'}>
        <Text color="gray.100" fontSize="xs" fontFamily="body" position={'absolute'} top={5} left={3} >E-mail</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              pt={4}
              h="auto"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="gray.200"
              keyboardType="email-address"
              autoComplete='email'
              color="gray.200"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />
      </VStack>

      <Button
        isLoading={isUpdating}
        title="Salvar"
        w="70%"
        mt={8}
        alignSelf="center"
        onPress={handleSubmit(handleUpdateUser)}
      />

    </ScreenContainer>
  )
}