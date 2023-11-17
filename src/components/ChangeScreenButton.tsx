import GoBackSvg from "@assets/goback.svg";
import NextScreenSvg from "@assets/arrow-right.svg";
import { Box, Pressable, IPressableProps, useColorMode } from "native-base";

type Props = IPressableProps & {
  isForNextPage?: boolean;
  background?: 'purple'
};

export function ChangeScreenButton({ isForNextPage, background, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <Box
        bg={background ? 'purple.500' : 'gray.50'}
        w={12}
        h={12}
        rounded="full"
        alignItems="center"
        justifyContent="center"
        display="flex"
        pr={isForNextPage ? 0 : 1}
        pl={isForNextPage ? 1 : 0}
      >
        {isForNextPage ? (
          <NextScreenSvg fill={background ? "#fff" : '#000'} />
        ) : (
          <GoBackSvg fill={background ? "#fff" : '#000'} />
        )}
      </Box>
    </Pressable>
  );
}
