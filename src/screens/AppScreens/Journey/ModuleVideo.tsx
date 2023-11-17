import { Comments } from "@components/Comments";
import { ModuleVideoButton } from "@components/ModuleVideoButton";
import { ScreenContainer } from "@components/ScreenContainer";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Box, Button, Divider, HStack, Heading, Image, Pressable, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { ModuleVideoPlayer } from "@components/ModuleVideoPlayer";
import { ContentDTO } from "../../../dtos/ModuleDTO";
import GoBackSvg from "@assets/goback.svg";
import { Share } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Input } from "@components/Input";
import { api } from "../../../services/api";
import { useAuth } from "@hooks/useAuth";
import { CommentDTO, CommentsData } from "../../../dtos/CommentDTO";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "@components/Loading";
import Animated, { FadeInDown } from "react-native-reanimated";
type RouteParams = {
  content: ContentDTO
  videoNumber: number
}


export function ModuleVideo() {
  const route = useRoute();
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [comments, setComments] = useState<CommentDTO[]>([])
  const { goBack } = useNavigation<AppNavigatorRoutesProps>()
  const { content, videoNumber } = route.params as RouteParams;
  const { colors } = useTheme()
  const { user } = useAuth()
  const toast = useToast()

  const articleWithBreakLine = content.contents_article?.split('/n')
  const url = 'https://unplugged.com'

  async function onShare() {
    try {
      const result = await Share.share({
        message: `
        Venha conhecer esse aplicativo incrível que estou usando para diminuir meu vício nas redes sociais e me tornar mais produtivo!
        \n${url}
        `,
      })


    } catch (err) {
      return
    }
  }
  async function likeComment(commentId: number) {
    try {
      await api.post(`/comments/${commentId}/like`)
    } catch (err) {
      return
    } finally {
      fetchComments()
    }
  }



  async function handleComment() {
    try {
      setIsSending(true)
      const commentData: CommentsData = {
        userId: user.id!!,
        comments_likes: 0,
        comments_rating: 0,
        comments_text: commentText,
        contentsId: content.id
      }
      await api.post('/comments/add', commentData)

      toast.show({
        title: 'Coméntario postado',
        placement: 'top',
        bgColor: 'green.700'
      })

      setCommentText('')
      fetchComments()


    } catch (error) {
      setIsSending(false);

      // const isAppError = error instanceof AppError;

      const title = 'Não foi possível enviar o comentário. Tente novamente';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })


    } finally {
      setIsSending(false)
    }
  }

  async function handleDeleteComment(data: CommentDTO) {
    try {
      await api.delete(`/comments/${data.id}/user/${data.userId}`)
      toast.show({
        title: 'Comentário deletado com sucesso!',
        placement: 'top',
        bgColor: 'red.500',

      })
      fetchComments()

    } catch (error) {

      const title = 'Não foi possível excluir o comentário. Tente novamente';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }
  }
  async function handleEditComment(data: CommentDTO) {
    try {
      await api.put(`/comments/${data.id}/${data.userId}`, data)
      toast.show({
        title: 'Comentário editado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',

      })
      fetchComments()

    } catch (error) {

      const title = 'Não foi possível editar o comentário. Tente novamente';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }
  }

  async function fetchComments() {
    try {
      const { data } = await api.get(`/comments/${content.id}`)
      setComments(data.comments)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os comentários.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }

  }

  async function loadComments() {
    try {
      setIsLoading(true)
      await fetchComments()
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os comentários.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    loadComments()
  }, [content.id]))
  return (
    <ScreenContainer px={0} py={0}>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {
          content.contents_type === 'video' && <ModuleVideoPlayer videoId={content.id} />
        }
        {
          content.contents_type === 'article' && (
            <HStack px={5} alignItems='center' >
              <Pressable onPress={() => goBack()} pr={4}>
                <GoBackSvg fill="#fff" />
              </Pressable>
              <Text fontFamily="heading" fontSize="2xl" color="white" lineBreakMode="middle">
                Aula {videoNumber + 1}: {content.contents_name}
              </Text>
            </HStack>

          )
        }
        {content.contents_type !== 'article' && (
          <Text px={5} mt={6} fontFamily="heading" fontSize="xl" color="white" lineBreakMode="middle">
            Aula {videoNumber + 1}: {content.contents_name}
          </Text>
        )}
        {
          content.contents_type === 'article' && (
            <>
              {articleWithBreakLine?.map((linha, index) => (
                <Text px={5} key={index} color="white" my={2}>{linha}</Text>
              ))}
            </>
          )

        }
        <HStack px={5} mt={2} alignItems="center" >
          <ModuleVideoButton icon="heart" label="Curtir" />
          <ModuleVideoButton icon="share-2" label="Compartilhar" onPress={onShare} />
        </HStack>
        <Divider my={7} />
        <VStack px={5}>
          <HStack w="full" alignItems="center" shadow={9} position="relative" p={0}>
            <Input
              bgColor="gray.500"
              rounded="xl"
              borderColor='transparent'
              placeholder="Adicione um comentário..."
              color="white"
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
              returnKeyType="send"
              onSubmitEditing={handleComment}
            />
            <Button position="absolute" right={4} onPress={handleComment} p={2} rounded="full" bg="transparent" isLoading={isSending} _pressed={{
              backgroundColor: "gray.600",
            }}>
              <Ionicons name="md-send" size={24} color={colors.gray[400]} />
            </Button>
          </HStack>
        </VStack>

        <VStack>
          {isLoading ? <Loading /> :
            comments.map((comment, index) => (
              <Animated.View entering={FadeInDown.delay(150 * index).duration(500).springify()} key={comment.id}>
                <Comments
                  handleDeleteComment={handleDeleteComment}
                  handleEditComment={handleEditComment}
                  comment={comment}
                  onLikeComment={likeComment}
                />
              </Animated.View>
            ))
          }
        </VStack>
      </ScrollView>


    </ScreenContainer >
  );
}
