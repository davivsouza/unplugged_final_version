import { AppTimer } from "@contexts/TimerControlContext";
import { checkIconUrl } from "@utils/checkIconUrl";
import { formatTimeHours } from "@utils/formatTime";
import { HStack, Image, Pressable, Text, useTheme } from "native-base";

import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';

type Props = {
  timer: AppTimer
  onDeleteTimer(app: AppTimer): void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function AppTimerCard({ onDeleteTimer, timer }: Props) {
  const { colors } = useTheme()
  const progress = useSharedValue(0);
  const positionY = useSharedValue(0);

  function handleLongPress() {
    progress.value = withSpring(1)
    positionY.value = withSpring(10)
  }

  function handleRelease(timer: AppTimer) {
    positionY.value = withSpring(0)
    progress.value = withSpring(0)
    onDeleteTimer(timer)
  }

  const InterPolateColorAnimationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', colors.gray[500]]
    )

    return {
      backgroundColor,
      borderRadius: 12,
      position: 'relative',
      bottom: positionY.value
    }
  })

  return (
    <AnimatedPressable
      rounded="xl"
      p={4}
      style={InterPolateColorAnimationStyle}
      onPressIn={handleLongPress}
      onPressOut={() => handleRelease(timer)}
    >
      <HStack alignItems="center" justifyContent="space-between" flex={1} >
        <HStack alignItems="center" space={4}>
          <Image source={checkIconUrl(timer.iconUrl)} alt={timer.appName} width={50} height={50} bg="white" rounded="lg" resizeMode="contain" />
          <Text color="white" fontSize="xl" fontFamily="semiBold">
            {timer.appName}
          </Text>
        </HStack>

        <Text color="white" fontSize="lg" fontFamily="semiBold">
          {formatTimeHours(timer.limitTime)}
        </Text>
      </HStack>
    </AnimatedPressable>
  )
}