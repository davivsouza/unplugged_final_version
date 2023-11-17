import { VStack } from "native-base"
import { HabitsInsights } from "./HabitsInsights"
import { HabitsMetas } from "./HabitsMetas"
import { HabitsControl } from "./HabitsControl"
import { HabitsItems } from "@screens/AppScreens/Habits"

type Props = {
  item: HabitsItems
}

export function HabitsContent({item}: Props){
  return (
    <VStack>
      {
        item === 'insights' && (
          <HabitsInsights/>
        )
      }
      {
        item === 'metas' && (
          <HabitsMetas/>
        )
      }
      {
        item === 'controle' && (
          <HabitsControl/>
        )
      }
    </VStack>
  )
}