import { Box, FlatList, HStack, Pressable, ScrollView, Text, VStack, useTheme } from "native-base";
import { InsightsCard } from "./InsightsCard";
import { VictoryPie } from 'victory-native'
import { HabitsChart } from "./HabitsChart";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";


export function HabitsInsights() {
  const { colors } = useTheme()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const DATA = [
    {
      x: 'Youtube',
      y: 120,
      color: colors.red[300]
    },
    {
      x: 'Tiktok',
      y: 480,
      color: colors.purple[500]
    },
    {
      x: 'Outros',
      y: 35,
      color: colors.yellow[300]
    },
    {
      x: 'Spotify',
      y: 20,
      color: colors.green[300]
    },
  ]

  function handleNavigate() {
    navigate('bemestarPainel')

  }

  return (
    <ScrollView height="78%" contentContainerStyle={{
      paddingBottom: 10,
    }} showsVerticalScrollIndicator={false}>


      <InsightsCard>
        <Text width={120} color="white" textAlign="center" position='absolute' top="42%">Clique para ver mais detalhes</Text>
        <Pressable
          position="absolute"
          width="full"
          height="full"
          onPress={handleNavigate}
          zIndex={22}

        />
        <VictoryPie
          data={DATA}
          colorScale={DATA.map(player => player.color)}
          innerRadius={90}
          style={{ labels: { fill: "white", fontSize: 20 } }}
          startAngle={-60}
          endAngle={360}
          width={400}
          height={300}
        />


      </InsightsCard>
      <InsightsCard >
        <HStack space={4} position="absolute" top={8} right={8}>
          <HStack alignItems='center' space={1}>
            <Box w={2} h={2} rounded="full" bg="gray.200" />
            <Text color="gray.200" fontSize="md">Planejados</Text>
          </HStack>
          <HStack alignItems='center' space={1}>
            <Box w={2} h={2} rounded="full" bg="purple.500" />
            <Text color="gray.200" fontSize="md">Concluídos</Text>
          </HStack>
        </HStack>
        <HabitsChart />

      </InsightsCard>

    </ScrollView >

  )
}