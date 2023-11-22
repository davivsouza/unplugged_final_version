import {
  Box,
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { InsightsCard } from "./InsightsCard";
import { VictoryPie } from "victory-native";
import { HabitsChart } from "./HabitsChart";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useUsageStats } from "@hooks/useUsageStats";
import { AppUsage } from "@contexts/UsageStatsContext";
import { useState } from "react";
const daysOfWeek = [
  {
    dayNumber: 0,
    day: "Dom",
  },
  {
    dayNumber: 1,
    day: "Seg",
  },
  {
    dayNumber: 2,
    day: "Ter",
  },
  {
    dayNumber: 3,
    day: "Qua",
  },
  {
    dayNumber: 4,
    day: "Qui",
  },
  {
    dayNumber: 5,
    day: "Sex",
  },
  {
    dayNumber: 6,
    day: "Sáb",
  },
];

type PieData = {
  x: string;
  y: number;
  color: string;
};

export function HabitsInsights() {
  const { colors } = useTheme();
  const { jumpTo } = useNavigation<AppNavigatorRoutesProps>();
  const { apps } = useUsageStats();
  let pieData: PieData[] = [];
  const pie_colors = [
    colors.red[500],
    colors.purple[500],
    colors.yellow[500],
    colors.pink[500],
    colors.orange[500],
    colors.green[500],
  ];

  const topApps = apps.slice(0, 4).map((app, idx) => ({
    x: app.name,
    y: app.usageTime,
    color: pie_colors[idx],
  })); // Seleciona os 4 primeiros aplicativos

  const remainingApps = apps.slice(4);
  const remainingTime = remainingApps.reduce((acc: number, app: AppUsage) => {
    return acc + app.usageTime;
  }, 0);

  const outros: PieData = {
    x: "Outros",
    y: remainingTime,
    color: pie_colors[5], // Altere para a cor desejada
  };

  if (remainingTime >= 1200) {
    pieData = [...topApps, outros];
  } else {
    pieData = [...topApps];
  }

  const formatLabel = (datum: { x: string }) => {
    // Adicione uma quebra de linha após o primeiro espaço
    const label = datum.x.replace(" ", "\n");
    return label;
  };

  function handleNavigate() {
    jumpTo("bemestarPainel");
  }

  return (
    <ScrollView
      height="78%"
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <InsightsCard>
        <Text
          width={120}
          color="white"
          textAlign="center"
          position="absolute"
          top="42%"
        >
          Clique para ver mais detalhes
        </Text>
        <Pressable
          position="absolute"
          width="full"
          height="full"
          onPress={handleNavigate}
          zIndex={22}
        />
        <VictoryPie
          data={pieData}
          colorScale={pieData.map((data) => data.color)}
          innerRadius={90}
          style={{
            labels: { fill: "white", fontSize: 16, textAlign: "center" },
          }}
          labels={({ datum }) => formatLabel(datum)}
          startAngle={-20}
          width={400}
          height={300}
        />
      </InsightsCard>
      <InsightsCard>
        <HStack space={4} position="absolute" top={8} right={8}>
          <HStack alignItems="center" space={1}>
            <Box w={2} h={2} rounded="full" bg="gray.200" />
            <Text color="gray.200" fontSize="md">
              Planejados
            </Text>
          </HStack>
          <HStack alignItems="center" space={1}>
            <Box w={2} h={2} rounded="full" bg="purple.500" />
            <Text color="gray.200" fontSize="md">
              Concluídos
            </Text>
          </HStack>
        </HStack>
        <ScrollView
          horizontal
          mt={15}
          width="100%"
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 200,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <HStack>
            {daysOfWeek.map((day) => (
              <HabitsChart
                key={day.day}
                dayNumber={day.dayNumber}
                weekDay={day.day}
              />
            ))}
          </HStack>
        </ScrollView>
      </InsightsCard>
    </ScrollView>
  );
}
