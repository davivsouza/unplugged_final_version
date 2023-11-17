import { Ionicons, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { VStack, useTheme } from 'native-base';
type Props = {
  category: string
  selectedCategory: string
}
export function MeditationCategoriesIcon({ category, selectedCategory }: Props) {
  const { colors } = useTheme()
  switch (category) {
    case 'Sleep':
      return <Ionicons name="moon" size={30} color={selectedCategory === category ? colors.black : colors.gray[100]} />

    case 'Relax':
      return <Entypo name="emoji-happy" size={30} color={selectedCategory === category ? colors.black : colors.gray[100]} />
    case 'Calm':
      return <Entypo name="air" size={30} color={selectedCategory === category ? colors.black : colors.gray[100]} style={{
        alignSelf: 'center',
      }} />
    case 'Focus':
      return <Feather name="eye" size={30} color={selectedCategory === category ? colors.black : colors.gray[100]} style={{
        alignSelf: 'center',
      }} />
    default:
      return <></>
  }
}