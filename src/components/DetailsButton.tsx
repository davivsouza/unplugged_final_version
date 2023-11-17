import { Pressable, Text, IPressableProps, Box, HStack } from "native-base";

type Props = IPressableProps & {
  title: string;
  isSelected?: boolean
};
export function DetailsButton({ title, isSelected, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <HStack alignItems="center">
        {isSelected && (
          <Box width={1} height={1} bgColor="purple.500" rounded="full" mr={2} />
        )}
        <Text color="white" fontFamily="body" fontSize="md">
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
}
