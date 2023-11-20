import { SvgProps } from "react-native-svg";
import { WellbeingApp } from "./WellbeingApp";
import {
  Box,
  HStack,
  IPressableProps,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { ImageSourcePropType } from "react-native";
import { useUsageStats } from "@hooks/useUsageStats";
import { AppUsage } from "@contexts/UsageStatsContext";
import { changeColorBySecondsTime } from "@utils/changeColorBySecondsTime";
import { formatTimeHours } from "@utils/formatTime";

type Props = IPressableProps & {
  app: AppUsage;
  selectedApp: AppUsage;
};

export function HabitsControlTimerAppBox({ app, selectedApp, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <HStack alignItems="center" mt={4}>
        <Box
          mr={4}
          w={6}
          h={6}
          borderWidth={2}
          borderColor={selectedApp.name === app.name ? "purple.500" : "white"}
          rounded="full"
          justifyContent="center"
          alignItems="center"
          style={{
            padding: 2,
          }}
        >
          <Box
            w={3}
            h={3}
            p={2}
            rounded="full"
            bg={selectedApp.name === app.name ? "purple.500" : "transparent"}
          />
        </Box>

        <HStack
          flex={1}
          alignItems="center"
          justifyContent="space-between"
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
      </HStack>
    </Pressable>
  );
}
