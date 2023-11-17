import { useCallback, useEffect, useState } from "react";
import { Divider, FlatList, Heading, Text, VStack, Pressable, HStack, Box, useToast } from "native-base";
import { Modules } from "@components/Modules";
import { ScreenContainer } from "@components/ScreenContainer";
import { useAuth } from "@hooks/useAuth";
import { api } from "../../../services/api";
import { ModuleDTO } from "../../../dtos/ModuleDTO";
import { JourneyHeader } from "@components/JourneyHeader";
import { useFocusEffect } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { NativeModules, Platform } from "react-native";


export function Journey() {
  const [modulesData, setModulesData] = useState<ModuleDTO[]>([]);
  const [isFetching, setIsFetching] = useState(false)
  const { user } = useAuth();
  const toast = useToast()



  async function fetchModules() {
    try {
      setIsFetching(true)
      const { data } = await api.get('modules/');
      setModulesData(data.modules)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os módulos!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsFetching(false)
    }


  }
  useFocusEffect(useCallback(() => {
    fetchModules()
  }, []))

  const fetchUsageStats = async () => {
    try {
      const startTime = String(Date.now() - 24 * 60 * 60 * 1000); // Exemplo: 24 horas atrás
      const endTime = String(Date.now()); // Exemplo: momento atual

      const stats = await NativeModules.UsageStatsModule.getAppUsage(
        startTime,
        endTime,
      );

      
      const filteredStats = stats.filter(app => app.appName !== '' && app.usageTime > 300); // 5 minutos = 300 segundos

    // Processar os aplicativos filtrados
    console.log(filteredStats);
      // Processar as estatísticas de uso de aplicativos
    } catch (error) {
      console.log(error);
      // Lidar com erros
    }
  };
  useEffect(() => {

    fetchUsageStats();
   
  }, [])

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInLeft.delay(200).duration(800).springify()}>

        <Heading
          fontFamily="body"
          fontWeight="normal"
          color="white"
          lineBreakMode="clip"
        >
          Bem-vindo á
        </Heading>
      </Animated.View>
      <Animated.View entering={FadeInLeft.delay(400).duration(800).springify()}>

        <Heading fontWeight="normal" fontFamily="body" color="white">
          Jornada <Text fontWeight="bold">{user.name}</Text>
        </Heading>
      </Animated.View>
      <Divider my={7} />
      {isFetching && <Loading />}
      {!isFetching && (
        <FlatList
          flex={1}
          data={modulesData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(150 * index).duration(800).springify()}>

              <Modules module={item} />
            </Animated.View>
          )}
        />
      )}

    </ScreenContainer>
  );
}
