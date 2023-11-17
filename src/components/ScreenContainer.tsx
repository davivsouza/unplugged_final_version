import { VStack, IStackProps } from "native-base";

type Props = IStackProps & {
  children: React.ReactNode
}

export function ScreenContainer({ children, ...rest }: Props) {
  return (
    <VStack
      flex={1}
      py={90}
      px={5}
      bg={"#16141C"}
      {...rest}
    >
      {children}
    </VStack>
  )
}
