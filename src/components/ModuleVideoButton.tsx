import { Pressable, IPressableProps, useTheme, HStack, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
type Props = IPressableProps & {
  icon: keyof typeof Feather.glyphMap;
  label: string
};
export function ModuleVideoButton({ icon, label, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      h={12}
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      <HStack alignItems="center" space={2} mr={5}>
        <Feather name={icon} size={22} color={colors.white} />
        <Text color="white" fontSize="md" fontFamily="body">{label}</Text>
      </HStack>
    </Pressable>
  );
}
