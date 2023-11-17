import { ColorMode, Pressable } from "native-base";
import LightModeSvg from "@assets/light-mode.svg";
import DarkModeSvg from "@assets/dark-mode.svg";

type Props = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

export function ThemeMode({ colorMode, toggleColorMode }: Props) {
  return (
    <Pressable
      onPress={toggleColorMode}
      w={50}
      h={50}
      mt={20}
      position="absolute"
      bottom={-50}
      right={0}
      alignItems="center"
      justifyContent="center"
      _light={{
        bg: "gray.50",
        rounded: "full",
      }}
    >
      {colorMode === "light" ? <DarkModeSvg /> : <LightModeSvg />}
    </Pressable>
  );
}
