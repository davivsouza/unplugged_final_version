import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  useTheme,
  useToast,
} from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CommentDTO } from "../dtos/CommentDTO";
import { dateDifference } from "@utils/timeDiference";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { EditCommentModal } from "./EditCommentModal";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { imagesUrl } from "@utils/baseUrls";

type Props = {
  comment: CommentDTO
  handleEditComment(data: CommentDTO): Promise<void>
  handleDeleteComment(data: CommentDTO): Promise<void>
  onLikeComment(commentId: number): Promise<void>

};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedAntDesignIcon = Animated.createAnimatedComponent(AntDesign)
export function Comments({ comment, handleDeleteComment, handleEditComment, onLikeComment }: Props) {
  const { colors } = useTheme();
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false);
  const isPressed = useSharedValue(0);
  const scale = useSharedValue(0)


  const InterpolateIconAnimatedStyle = useAnimatedStyle(() => {

    const pressButton = interpolateColor(
      isPressed.value,
      [0, 1],
      [colors.gray[300], colors.purple[500]]
    )
    const rotateValue = interpolate(
      isPressed.value,
      [0, 1],
      [0, -20]
    )

    return {

      color: pressButton,
      transform: [{ rotate: `${rotateValue}deg` }]
    }
  })


  function startAnimation() {
    isPressed.value = withSpring(1)
  }

  function endAnimation() {
    isPressed.value = withSpring(0)
  }


  function handlePress(id: number) {
    startAnimation()
    onLikeComment(id)
  }
  return (
    <VStack alignSelf="center">
      <EditCommentModal onDeleteComment={handleDeleteComment} onEditComment={handleEditComment} comment={comment} onOpenModal={setShowModal} isModalOpen={showModal} />
      <Box w={360} my={3} bgColor="gray.500" px={3} py={5} rounded="xl" shadow={9} >
        <VStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={2}>
              <Image
                w={8}
                h={8}
                source={{ uri: `${imagesUrl}/${comment.User.img_user}` }}
                alt={user.name}
                rounded="full"
              />
              <Text color="white" fontFamily="semiBold" fontSize="sm">
                {comment.User.nickname}
              </Text>
              <Text color="gray.300" fontFamily="body" fontSize="xs">
                {dateDifference(comment.created_at)}
              </Text>
            </HStack>
            {comment.userId === user.id && (
              <Box alignSelf="flex-end">
                <Pressable
                  alignItems="center"
                  justifyContent="center"
                  rounded="full" p={2}
                  _pressed={{
                    backgroundColor: "gray.600",
                  }}
                  onPress={() => setShowModal(true)}
                >
                  <Feather name="edit" size={20} color={colors.gray[300]} />
                </Pressable>
              </Box>
            )}
          </HStack>
          <Text w="85%" mt={4} pl={2} color="white" fontFamily="body" fontSize="xs" lineBreakMode="tail" >
            {comment.comments_text}
          </Text>
          <AnimatedPressable
            position="absolute"
            right={2}
            bottom={0}
            disabled={comment.userId === user.id}
            _disabled={{
              display: 'none'

            }}
            onPressIn={() => handlePress(comment.id)}
            onPressOut={endAnimation}
          >
            <HStack space={2} alignItems="center"  >
              <AnimatedAntDesignIcon name="like2" size={20} style={InterpolateIconAnimatedStyle} />
              <Text color="gray.300" fontFamily="body" fontSize="xs">
                {comment.comments_likes}
              </Text>
            </HStack>
          </AnimatedPressable>

        </VStack>
      </Box>
    </VStack >

  );
}

