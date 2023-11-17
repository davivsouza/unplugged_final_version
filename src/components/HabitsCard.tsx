import {
  VStack,
  Text,
  Box,
  HStack,
  useTheme,
  Pressable,
  useToast,
} from "native-base";
import { HabitDTO, HabitLogs } from "../dtos/HabitDTO";
import { Feather } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedHabitsCard = Animated.createAnimatedComponent(VStack);
type Props = {
  habit: HabitDTO;
  onComplete: (habitId: number, userId: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  // isHabitCompleted: boolean,
  // handleIsHabitCompleted: (bool: boolean) => void
  checkIsHabitCompleted(habit: HabitDTO): [] | HabitLogs[];
};

export function HabitsCard({
  habit,
  onComplete,
  onDelete,
  checkIsHabitCompleted,
}: Props) {
  const { colors } = useTheme();
  const positionLeft = useSharedValue(0)

  const deleteAnimationStyles = useAnimatedStyle(() => ({
    position: "relative",
    left: positionLeft.value,
  }));
  function completeHabit() {
    onComplete(Number(habit.id), String(habit.userId));
  }



  return (
    <AnimatedHabitsCard
      overflow="hidden"
      position="relative"
      w="full"
      rounded="lg"
      bg="purple.600"
      px={4}
      py={2}
      shadow={9}
      style={[{
        elevation: 10,
      }, deleteAnimationStyles]}
      mb={4}
    >
      <Box
        position="absolute"
        top={-5}
        left={0}
        w={1}
        h="100"
        bg={
          checkIsHabitCompleted(habit)?.length > 0 ? "purple.600" : habit.color
        }
        borderTopLeftRadius="full"
        borderBottomLeftRadius="full"
      />
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text
            fontSize="lg"
            color={
              checkIsHabitCompleted(habit).length > 0 ? "gray.400" : "white"
            }
            fontFamily="semiBold"
            textDecorationLine={
              checkIsHabitCompleted(habit)?.length > 0 ? "line-through" : "none"
            }
          >
            {habit.name}
          </Text>
          <Text
            fontSize="sm"
            color={
              checkIsHabitCompleted(habit).length > 0 ? "gray.400" : "gray.300"
            }
            fontFamily="body"
          >
            {habit.description}
          </Text>
        </VStack>
        {checkIsHabitCompleted(habit).length == 0 && (
          <HStack alignItems="center" space={8}>
            <Pressable onPress={() => {
              positionLeft.value = withSpring(-600)
              onDelete(Number(habit.id))
            }
            }>
              <Feather name="trash-2" size={20} color={colors.gray[100]} />
            </Pressable>
            <Pressable onPress={completeHabit}>
              <Feather name="check-circle" size={20} color={colors.gray[100]} />
            </Pressable>
          </HStack>
        )}
      </HStack>
    </AnimatedHabitsCard>
  );
}
