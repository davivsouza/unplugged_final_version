import { HStack, Text, useTheme } from "native-base";
import { AntDesign, Entypo } from '@expo/vector-icons'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

type Props = {
  icon?: keyof typeof AntDesign.glyphMap
  label: string
  screen?: string
}
export function ProfileOption({ icon, label, screen }: Props) {
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function handleChangeScreen() {
    if (screen === 'favoriteSounds') {
      navigate('favoriteBinauralSounds')
    }

  }
  return (
    <Pressable onPress={handleChangeScreen}>

      <HStack w="full" alignItems='center' justifyContent="space-between" mb={6}>
        <HStack alignItems="center" space={4}>
          <AntDesign name={icon} size={25} color={colors.white} />
          <Text color="white" fontSize="lg" fontFamily={'body'}>{label}</Text>
        </HStack>
        <Entypo name={'chevron-right'} size={25} color={colors.white} />
      </HStack>
    </Pressable>
  )
}