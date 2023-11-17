import { Box, HStack, Progress, ScrollView, Text, VStack } from "native-base";
import { HabitsChartItem } from "./HabitsChartItem";
type Props = {
  weekDay: string
}
export function HabitsChart() {
  return (
    <ScrollView horizontal  mt={15} width="100%" contentContainerStyle={{
      alignItems: 'center',
      paddingTop: 200
    }}
    showsHorizontalScrollIndicator={false}>
      <HStack>

        <HabitsChartItem weekDay="Dom" maxTask={10} taskCompleted={5} w={20} />
        <HabitsChartItem weekDay="Seg" maxTask={4} taskCompleted={3} w={20} />
        <HabitsChartItem weekDay="Ter" maxTask={7} taskCompleted={2}  w={20}/>
        <HabitsChartItem weekDay="Qua" maxTask={2} taskCompleted={1}  w={20}/>
        <HabitsChartItem weekDay="Qui" maxTask={5} taskCompleted={0}  w={20}/>
        <HabitsChartItem weekDay="Sex" maxTask={3} taskCompleted={0}  w={20}/>
        <HabitsChartItem weekDay="Sáb" maxTask={3} taskCompleted={0}  w={20}/>
        
      </HStack>
    </ScrollView>

  )
}