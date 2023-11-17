import { HStack } from "native-base";
import { DetailsButton } from "./DetailsButton";
import { HabitsItems } from "@screens/AppScreens/Habits";

type Props = {
  selectedItem: HabitsItems
  onSelectItem: (item: HabitsItems) => void
}
export function HabitsNavigation({ selectedItem, onSelectItem }: Props) {

  return (
    <HStack alignItems="center" justifyContent="space-evenly" mb={6}>
      <DetailsButton
        title="Insights"
        isSelected={selectedItem === "insights" && true}
        onPress={() => onSelectItem("insights")}
      />
      <DetailsButton
        title="Seus hábitos"
        isSelected={selectedItem === "metas" && true}
        onPress={() => onSelectItem("metas")}
      />
      {/* <DetailsButton
        title="Controle"
        isSelected={selectedItem === "controle" && true}
        onPress={() => onSelectItem("controle")}
      /> */}

    </HStack>
  )
}