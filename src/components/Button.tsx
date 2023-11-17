import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string
}
export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      bg="purple.500"
      rounded="xl"

      _pressed={
        {
          bgColor: 'purple.600',
        }
      }

      {...rest}
    >
      <Text
        fontFamily="heading"
        fontWeight="bold"
        fontSize="xl"
        color="white"
      >

        {title}
      </Text>
    </NativeBaseButton>
  )
}