import { IPressableProps, Pressable } from 'native-base';


type Props = IPressableProps & {
  children: React.ReactNode
}

export function AudioPlayerButton({ children, ...rest }: Props) {
  return (
    <Pressable
      w={20}
      h={20}
      alignItems="center"
      justifyContent="center"
      rounded="full"
      {...rest}
    >
      {children}
    </Pressable>
  )
}