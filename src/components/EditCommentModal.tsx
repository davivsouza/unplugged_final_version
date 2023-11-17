import { Box, HStack, Modal, PresenceTransition, Pressable, Text, TextArea, VStack, useTheme } from "native-base"
import { Input } from "./Input"
import { Button } from "./Button"
import { Feather, AntDesign } from '@expo/vector-icons';
import { CommentDTO } from "../dtos/CommentDTO";
import { useState } from "react";
type Props = {
  comment: CommentDTO
  isModalOpen: boolean
  onOpenModal: (status: boolean) => void
  onEditComment: (data: CommentDTO) => Promise<void>
  onDeleteComment: (data: CommentDTO) => Promise<void>
}

export function EditCommentModal({ comment, isModalOpen, onDeleteComment, onEditComment, onOpenModal }: Props) {
  const { colors } = useTheme()
  const [text, setText] = useState(comment.comments_text)

  function handleEdit() {
    const commentEdit: CommentDTO = {
      ...comment,
      comments_text: text
    }
    onEditComment(commentEdit).then(
      () => {
        onOpenModal(false)
      }
    )
  }
  function handleDelete() {

    onDeleteComment(comment).then(
      () => {
        onOpenModal(false)
      }
    )
  }
  return (
    <Modal
      isOpen={isModalOpen}
      justifyContent="center"
      alignItems="center"
      _backdrop={{
        bg: "gray.900"
      }}
      onClose={() => onOpenModal(false)}
    >
      <PresenceTransition
        visible={isModalOpen}
        initial={{
          opacity: 0.5,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 220
          }
        }}
      >

        <VStack bg="gray.900" borderColor="gray.600" borderWidth={1} rounded="2xl" w="90%" p={5} >
          <HStack alignItems="center" space={2}>
            <Box p={2} rounded='full' bg="gray.400">
              <AntDesign name="user" size={20} color="white" />
            </Box>
            <Text color="white" fontFamily="semiBold" fontSize="sm">
              {comment.User.name}
            </Text>

          </HStack>
          <TextArea
            w="full"
            h={20}
            color="white"
            bg="transparent"
            borderWidth={1}
            rounded="xl"
            borderColor="gray.400"
            placeholder="Comente sobre o que achou do conteúdo..."
            value={text}
            placeholderTextColor="white"
            fontSize="md"
            fontFamily="body"
            my={4}
            p={4}
            autoCompleteType="off"
            _focus={{
              bg: "transparent",
              borderColor: 'purple.500',
              _android: {
                selectionColor: 'purple.500'
              }

            }}
            onChangeText={text => setText(text)}
          />

          <HStack alignSelf="flex-end" space={3}>

            <Pressable
              rounded="xl"
              px={4}
              py={1}
              _pressed={{
                bg: "gray.500"
              }}
              onPress={handleDelete}
            >

              <HStack alignItems="center">
                <Feather name="trash-2" size={20} color={colors.red[500]} />
                <Text color="red.500" fontSize="sm" ml={1} fontFamily="body">Excluir </Text>
              </HStack>
            </Pressable>
            <Pressable
              rounded="xl"
              px={4}
              py={1}
              _pressed={{
                bg: "gray.500"
              }}
              onPress={handleEdit}
            >
              <HStack alignItems="center">
                <Feather name="edit" size={20} color={colors.purple[500]} />
                <Text color="purple.500" fontSize="sm" ml={1} fontFamily="body">Editar</Text>
              </HStack>

            </Pressable>
          </HStack>
        </VStack>

      </PresenceTransition>
    </Modal>
  )
}