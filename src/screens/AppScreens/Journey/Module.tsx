import {
  VStack,
  Text,
  HStack,
  Divider,
  Progress,
  Box,
  Pressable,
} from "native-base";

import { useNavigation, useRoute } from "@react-navigation/native";

import { ModuleDetails } from "@components/ModuleDetails";
import { ScreenContainer } from "@components/ScreenContainer";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import VideosSvg from "@assets/journey/videos-icon.svg";
import { ModuleDTO } from "../../../dtos/ModuleDTO";
import { useState } from "react";
import { JourneyHeader } from "@components/JourneyHeader";

type RouteParams = ModuleDTO;

export function Module() {
  const [selectedInfo, setSelectedInfo] = useState<"about" | "content">("about");

  const route = useRoute();
  const tempProgress = 0


  const module = route.params as RouteParams;



  return (
    <ScreenContainer>

      <Box>
        <JourneyHeader canGoBack />
      </Box>

      <HStack space={2} alignItems='center' position={'relative'}>
        <Text fontFamily="body" color="white" fontSize="2xl">
          Módulo {module.id}: {module.module_name}
        </Text>
      </HStack>

      <HStack mt={3} alignItems="center">
        <VideosSvg />
        <Text color="gray.50" fontFamily="body" fontSize="xs">
          0/{module.content_count}
        </Text>
      </HStack>
      <Divider my={7} />
      <ModuleDetails
        module_description={module.module_description}
        contents={module.contents}
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
      />
    </ScreenContainer>
  );
}
