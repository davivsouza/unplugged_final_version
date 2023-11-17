import { useFocusEffect } from "@react-navigation/native";
import { changeColorBySecondsTime } from "@utils/changeColorBySecondsTime";
import { formatTime, formatTimeHours } from "@utils/formatTime";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { useCallback, useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

type Props = {
  appName: string
  icon: ImageSourcePropType
  seconds?: number
}

export function WellbeingApp({ appName, seconds, icon }: Props) {
  const [appTagColor, setAppTagColor] = useState<ColorType>()


  useFocusEffect(useCallback(() => {
    const color = changeColorBySecondsTime(seconds!!)
    setAppTagColor(color)
  }, []))
  return (
    <HStack flex={1} alignItems="center" justifyContent="space-between" >
      <HStack
        alignItems="center"
        space={2}
      >
        <Image source={icon} alt={appName} width={50} height={50} bg="white" rounded="lg" resizeMode="contain" />

        <Text
          color="white"
          fontFamily="body"
          fontSize="md"
        >{appName}</Text>
      </HStack>
      {seconds!! > 0 && (
        <VStack
          alignItems="flex-end"
          space={1}
        >
          <Box width={5} height={1} bg={appTagColor} rounded="full" />
          <Text
            color="white"
            fontFamily="body"
            fontSize="sm"
          >{formatTimeHours(seconds!!)}</Text>
        </VStack>
      )}
    </HStack>
  )
}