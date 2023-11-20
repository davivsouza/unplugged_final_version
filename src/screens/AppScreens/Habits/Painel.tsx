import { ScreenContainer } from "@components/ScreenContainer";
import {
  Text,
  ScrollView,
  useTheme,
  HStack,
  Pressable,
  Box,
  VStack,
  Image,
} from "native-base";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { WellbeingApp } from "@components/WellbeingApp";
import { AntDesign } from "@expo/vector-icons";

import GoBackSvg from "@assets/goback.svg";
import TikTokIcon from "@assets/habits/tiktok.png";
import InstagramIcon from "@assets/habits/instagram.png";
import TwitterIcon from "@assets/habits/twitter.png";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { formatTime, formatTimeHours } from "@utils/formatTime";
import { useAuth } from "@hooks/useAuth";
import { imagesUrl } from "@utils/baseUrls";
import { useEffect, useState } from "react";
import { NativeModules } from "react-native";
import { changeColorBySecondsTime } from "@utils/changeColorBySecondsTime";
import { Loading } from "@components/Loading";

interface AppUsage {
  package: string;
  name: string;
  usageTime: number;
  appIcon: string;
}

const day = dayjs().locale("pt-br").format("DD").toString();
const month = dayjs().locale("pt-br").format("MMMM").toString();
const formatedMonth = month.charAt(0).toUpperCase() + month.slice(1);
const today = `${dayjs()
  .locale("pt-br")
  .format("ddd")
  .toString()}, ${day} de ${formatedMonth} `;

const sharedAxisStyle = {
  axis: {
    stroke: "#fff",
  },
  axisLabel: {
    padding: 30,
    fill: "#fff",
  },
  tickLabels: {
    fill: "#fff",
    fontSize: 12,
  },
};

export function Painel() {
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();
  const [apps, setApps] = useState<any>([]);
  const [totalUsageTime, setTotalUsageTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function handleNavigate() {
    goBack();
  }

  const fetchUsageStats = async () => {
    try {
      setIsLoading(true);
      const startTime = String(Date.now() - 24 * 60 * 60 * 1000); // Exemplo: 24 horas atrás
      const endTime = String(Date.now()); // Exemplo: momento atual

      const stats = await NativeModules.UsageStatsModule.getAppUsage(
        startTime,
        endTime
      );

      const uniqueApps: { [key: string]: AppUsage } = {};
      const processedStats: AppUsage[] = [];
        
      stats.forEach((app) => {
       
        
        if (app.name !== "(unknown)" && app.usageTime > 300) {
          if (
            !uniqueApps[app.package] ||
            app.usageTime > uniqueApps[app.package].usageTime
          ) {
            uniqueApps[app.package] = app;
          }
        }
      });

      Object.values(uniqueApps).sort((a, b) => b.usageTime - a.usageTime).forEach((app) => {
        const icon = `data:image/png;base64,${app.appIcon}`;
        processedStats.push({
          package: app.package,
          name: app.name,
          usageTime: app.usageTime,
          appIcon: icon,
        });
      });
      

      const totalUsageInSeconds: number = processedStats.reduce(
        (total: number, app: AppUsage) => total + app.usageTime,
        0
      );

      setTotalUsageTime(totalUsageInSeconds);

      setApps(processedStats);
    } catch (error) {
      console.log(error);
      // Lidar com erros
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsageStats();
  }, []);

  return (
    <ScreenContainer py={0} pt={10}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <HStack alignItems="center" justifyContent="space-between">
            <Pressable
              py={3}
              pr={8}
              onPress={handleNavigate}
              alignItems="center"
              justifyContent="center"
            >
              <GoBackSvg fill="#fff" />
            </Pressable>
            <Text color="white" fontSize="2xl" fontFamily="heading">
              Painel
            </Text>
            <Pressable my={8} onPress={() => navigate("profile")}>
              <Image
                w={12}
                h={12}
                source={{ uri: `${imagesUrl}/${user.img_user}` }}
                alt={user.name}
                rounded="full"
              />
            </Pressable>
          </HStack>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          >
            <Text
              color="gray.200"
              fontSize="2xl"
              fontFamily="body"
              textAlign="center"
              mt={12}
            >
              Tempo da semana
            </Text>
            <Text
              color="white"
              fontSize="3xl"
              fontFamily="body"
              textAlign="center"
            >
              {formatTimeHours(totalUsageTime * 2)}
            </Text>
            <Text
              color="gray.200"
              fontSize="md"
              fontFamily="body"
              textAlign="center"
            >
              {today}
            </Text>
          
            <Box alignItems="center" justifyContent="center">
              <VictoryChart
                animate={{ duration: 700, easing: "bounce" }}
                width={430}
                domainPadding={{ x: 30, y: 30 }}
              >
                <VictoryAxis
                  dependentAxis
                  style={{
                    ...sharedAxisStyle,
                    grid: {
                      fill: "#fff",
                      stroke: "#fff",
                      pointerEvents: "painted",
                      strokeWidth: 0.5,
                    },
                  }}
                />
                <VictoryBar
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onPress: (data) => {
                          return [
                            {
                              target: "data",
                              mutation: (props) => {
                                const fill = props.style.fill;
                                return fill === colors.purple[500]
                                  ? null
                                  : { style: { fill: colors.purple[500] } };
                              },
                            },
                          ];
                        },
                      },
                    },
                  ]}
                  cornerRadius={6}
                  barWidth={30}
                  data={[
                    { day: "Dom", hours: 3 },
                    { day: "Seg", hours: 8 },
                    { day: "Ter", hours: 2 },
                    { day: "Qua", hours: 6 },
                    { day: "Qui", hours: 4 },
                    { day: "Sex", hours: 2 },
                    { day: "Sáb", hours: 10 },
                  ]}
                  x="day"
                  y="hours"
                  style={{
                    data: {
                      fill: colors.purple[200],
                    },
                  }}
                />
                <VictoryAxis
                  style={{
                    ...sharedAxisStyle,
                  }}
                />
              </VictoryChart>
            </Box>
            <Pressable onPress={async () => {
              await NativeModules.UsageStatsModule.openUsageAccessSettings()
            }}>
              <Text color="red.200">Open settings</Text>
            </Pressable>
            <Text color="gray.200" fontSize="lg" fontFamily="body" mt={12}>
              Tempo de uso:
            </Text>
            <Text color="white" fontSize="2xl" fontFamily="semiBold" mb={3}>
              {formatTimeHours(totalUsageTime)}
            </Text>

            {apps.length > 0 &&
              apps.map((app: any) => (
                <HStack
                  flex={1}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={4}
                  key={app.package}
                >
                  <HStack alignItems="center" space={2}>
                    <Image
                      source={{ uri: app.appIcon }}
                      alt={app.name}
                      style={{ width: 50, height: 50 }}
                    />

                    <Text color="white" fontFamily="body" fontSize="md">
                      {app.name}
                    </Text>
                  </HStack>

                  <VStack alignItems="flex-end">
                    <Box
                      width={5}
                      height={1}
                      bg={changeColorBySecondsTime(app.usageTime)}
                      rounded="full"
                    />
                    <Text color="white" fontFamily="body" fontSize="sm">
                      {formatTimeHours(app.usageTime)}
                    </Text>
                  </VStack>
                </HStack>
              ))}
          </ScrollView>
        </>
      )}
    </ScreenContainer>
  );
}
