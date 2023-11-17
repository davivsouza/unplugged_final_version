import {
  VStack,
  Text,
  HStack,
  Pressable,
  FlatList,
  Box,
  Heading,
  useTheme,
} from "native-base";
import { useEffect, useState } from "react";
import { DetailsButton } from "./DetailsButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ContentDTO } from "../dtos/ModuleDTO";
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons';
type Props = {
  module_description: string
  contents: ContentDTO[]
  selectedInfo: string
  setSelectedInfo: (info: "about" | "content") => void
}

export function ModuleDetails({ module_description, setSelectedInfo, selectedInfo, contents }: Props) {

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme()

  return (
    <VStack>
      <HStack alignItems="center" justifyContent="space-evenly" mb={10}>
        <Animated.View entering={FadeInLeft.delay(200).duration(800).springify()}>

          <DetailsButton
            title="Sobre"
            isSelected={selectedInfo === "about"}
            onPress={() => setSelectedInfo("about")}
          />
        </Animated.View>
        <Animated.View entering={FadeInRight.delay(400).duration(800).springify()}>

          <DetailsButton
            title="Conteúdo"
            isSelected={selectedInfo === "content"}
            onPress={() => setSelectedInfo("content")}
          />
        </Animated.View>

      </HStack>
      {selectedInfo === "about" && (
        <Animated.View entering={FadeInDown.delay(200).duration(800).springify()} style={{ paddingHorizontal: 12 }}>
          <Text color="white" fontFamily="body" fontSize="sm">
            {module_description}
          </Text>
        </Animated.View>
      )}
      {selectedInfo === "content" && (
        <FlatList
          data={contents}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 8,
          }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item: content, index }) => (
            <Animated.View entering={FadeInDown.delay(200 * index).duration(800).springify()}>

              <HStack justifyContent="space-between" alignItems="center" mb={6}>
                <HStack flex={1} alignItems="center">
                  <Box
                    width={12}
                    height={12}
                    borderWidth={1}
                    borderColor="white"
                    rounded="full"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    mr={4}
                  >
                    <Text color="white" fontFamily="body" fontSize="lg">
                      {index + 1}
                    </Text>
                  </Box>
                  <VStack flex={1}>
                    <Text flex={1} color="white" fontFamily="body" fontSize="md" lineBreakMode="clip" textBreakStrategy="balanced" numberOfLines={2}>
                      {content.contents_name}
                    </Text>
                    <Text color="gray.300" fontFamily="body" fontSize="xs">
                      {content.contents_type === 'video' ? Math.floor(content.contets_duration / 60) + 'min' : 'Artigo'}
                    </Text>
                  </VStack>
                </HStack>
                <Pressable
                  height={8}
                  px={4}
                  py={1}
                  textAlign="center"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="purple.500"
                  rounded="xl"
                  justifyContent="center"
                  onPress={() => navigate('moduleVideo', { content, videoNumber: index })}
                >
                  <Text color="purple.500" fontSize="xs">
                    {content.contents_type === 'video' ? <Feather name="play" size={15} color={colors.purple[500]} /> : 'Ler'}
                  </Text>
                </Pressable>
              </HStack>
            </Animated.View>
          )}
        />
      )}
    </VStack>
  );
}
