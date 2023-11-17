import { HabitsContent } from "@components/HabitsContent";
import { HabitsNavigation } from "@components/HabitsNavigation";
import { ScreenContainer } from "@components/ScreenContainer";
import { HStack, Text } from "native-base";
import { useState } from 'react'
export type HabitsItems = "insights" | "metas" | "controle"
export function Habits() {
  const [selectedItem, setSelectedItem] = useState<HabitsItems>("insights");

  function handleSelectedItem(item: HabitsItems) {
    setSelectedItem(item)
  }

  return (
    <ScreenContainer px={2}>
      <HStack alignItems="center" justifyContent="center" position="relative" mb={12}>
        <Text color="white" fontFamily="semiBold" fontSize="3xl" textAlign="center">
          Hábitos
        </Text>

      </HStack>
      <HabitsNavigation selectedItem={selectedItem} onSelectItem={handleSelectedItem} />
      <HabitsContent item={selectedItem} />

    </ScreenContainer>
  )
}