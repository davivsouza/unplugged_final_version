import { HStack, IPressableProps, Pressable, Text } from "native-base";

type Props = IPressableProps & {
  minutes: number

}
export function HabitsTimerInputButton({ minutes, ...rest }: Props) {
  return (
    <Pressable alignItems="center" justifyContent="center"
      {...rest}
      h={20}
      p={2}
      borderWidth={1}
      borderColor="white"
      rounded="3xl"
      flex={1}
    >
      <HStack alignItems="center">
        <Text lineHeight={20} textAlign="center" color="white" fontSize="xl" fontFamily="body">{minutes} min</Text>
      </HStack>
    </Pressable>
  )
}