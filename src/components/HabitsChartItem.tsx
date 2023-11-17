import { Box, IBoxProps, Progress, Text } from "native-base";
type Props  = IBoxProps & {
  weekDay: string
  taskCompleted: number
  maxTask: number
}
export function HabitsChartItem({ maxTask,taskCompleted,weekDay, ...rest}: Props) {
  const progress = (taskCompleted / maxTask) * 100
  return (
    <Box  alignItems="center" justifyContent="center"
    style={{
      transform: [{ rotate: '-90deg' }]
    }}
    {...rest}
    >
      <Text color="white" position="absolute" right={-140} style={{
        transform: [{ rotate: '90deg' }]
      }}>

        {taskCompleted}/{maxTask}
      </Text>

      <Progress
        position="absolute" left={10}
        bg="gray.200"
        maxW={150}
        w={progress > 0  ? 150  : 1}
        h={10}

        rounded="xl"
        _filledTrack={{
          bg: "purple.500",
          rounded: 'xl'
        }}
        value={progress}
      />

      <Text color="white" position="absolute" left={0} style={{
        transform: [{ rotate: '90deg' }]
      }}>

        {weekDay}
      </Text>
    </Box>
  )
}