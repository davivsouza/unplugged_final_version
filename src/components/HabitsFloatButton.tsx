import { IPressableProps, Pressable } from 'native-base'
import { Feather } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
type Props = IPressableProps
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export function HabitsFloatButton({ ...rest }: Props) {
  const scale = useSharedValue(1)

  //estilos animados 
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))




  function onPressIn() {
    scale.value = withTiming(1.1)

  }

  function onPressOut() {
    scale.value = withTiming(1)
  }



  return (
    <AnimatedPressable
      w={16}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      h={16}
      rounded="full"
      bg="purple.500"
      position="absolute"
      right={4}
      top={408}
      alignItems="center"
      justifyContent="center"
      zIndex={2000}
      style={[{
        elevation: 200,
      }, animatedContainerStyle]}
      {...rest}
    >
      <Feather name="plus" size={40} color="white" />
    </AnimatedPressable>
  )
}