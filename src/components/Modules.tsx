import { Box, HStack, Heading, Text, VStack } from "native-base";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import VideosSvg from "@assets/journey/videos-icon.svg";
import ShowModulesDataSvg from "@assets/journey/more-icon.svg";
import { ModuleDTO } from "../dtos/ModuleDTO";

type Props = {
  module: ModuleDTO;
};

export function Modules({ module }: Props) {
  const { jumpTo } = useNavigation<AppNavigatorRoutesProps>();

  return (
    <TouchableOpacity
      onPress={() =>
        jumpTo("module", module)
      }
    >
      <VStack bg="gray.700" py={5} px={4} rounded="xl" mb={5} shadow={3} flex={1}>
        <HStack alignItems="center" justifyContent="space-between">
          <VStack>
            <HStack alignItems="center">
              <Heading fontFamily="heading" color="white" fontSize="md">
                Módulo {module.id}: {module.module_name}
              </Heading>
            </HStack>
            <HStack alignItems="center">
              <VideosSvg />
              <Text color="gray.50" fontFamily="body" fontSize="xs">
                0/{module.content_count}
              </Text>
            </HStack>
          </VStack>
          <ShowModulesDataSvg />
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}
