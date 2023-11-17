import { Heading, VStack, Text } from "native-base";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {
  heading: string;
  text: string;
};
export function FormHeader({ heading, text }: Props) {
  return (
    <VStack my={4}>
      <Animated.View entering={FadeInUp.delay(200).duration(500).springify()}>
        <Heading fontSize="4xl" fontFamily="heading" mt={12}>
          {heading}
        </Heading>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(300).duration(800).springify()}>
        <Text fontFamily="body" color="gray.400" mt={2}>
          {text}
        </Text>
      </Animated.View>


    </VStack>
  );
}
