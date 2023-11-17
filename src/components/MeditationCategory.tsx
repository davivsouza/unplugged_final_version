import { Box, HStack, Pressable, Text, useTheme } from "native-base";
import SleepIconSvg from '@assets/meditations/Sleep-icon.svg'
import { MeditationCategoriesIcon } from "./MeditationCategoriesIcon";

type Props = {
  onSelectCategory: (category: string) => void
  selectedCategory: string
  category: string
  label: string
}

export function MeditationCategory({ label, onSelectCategory, selectedCategory, category }: Props) {
  return (

    <Pressable onPress={() => onSelectCategory(category)} alignItems="center" mt={12} mr={6} >
      <HStack
        w={16}
        h={16}
        bg={category === selectedCategory ? 'white' : 'transparent'}
        rounded="full"
        borderWidth={1}
        borderColor={category === selectedCategory ? 'black' : 'gray.100'}
        alignItems="center"
        justifyContent="center"
      >
        <MeditationCategoriesIcon category={category} selectedCategory={selectedCategory} />
      </HStack>
      <Text mt={2} color={category === selectedCategory ? 'white' : 'gray.100'}>{label}</Text>
    </Pressable>
  )
}