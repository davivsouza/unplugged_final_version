import { createContext, useEffect, useState } from "react";
import { NativeModules, Alert, AppState } from "react-native";
type UsageStatsContextProviderProps = {
  children: React.ReactNode;
};
export interface AppUsage {
  package: string;
  name: string;
  usageTime: number;
  appIcon: string;
}
export type UsageStatsContextData = {
  apps: AppUsage[];
  totalUsageTime: number;
  isLoadingApps: boolean;
};
export const UsageStatsContext = createContext({} as UsageStatsContextData);

export function UsageStatsContextProvider({
  children,
}: UsageStatsContextProviderProps) {
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [apps, setApps] = useState<AppUsage[]>([]);
  const [totalUsageTime, setTotalUsageTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const fetchUsageStats = async () => {
    try {
      setIsLoadingApps(true);
      const startTime = String(Date.now() - 24 * 60 * 60 * 1000); // Exemplo: 24 horas atrás
      const endTime = String(Date.now()); // Exemplo: momento atual

      const stats = await NativeModules.UsageStatsModule.getAppUsage(
        startTime,
        endTime
      );

      const uniqueApps: { [key: string]: AppUsage } = {};
      const processedStats: AppUsage[] = [];

      stats.forEach((app: AppUsage) => {
        if (app.name !== "(unknown)" && app.usageTime > 900) {
          if (
            !uniqueApps[app.package] ||
            app.usageTime > uniqueApps[app.package].usageTime
          ) {
            uniqueApps[app.package] = app;
          }
        }
      });

      Object.values(uniqueApps)
        .sort((a, b) => b.usageTime - a.usageTime)
        .forEach((app) => {
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
      setIsLoadingApps(false);
    }
  };

  async function openAcessUsageSettings() {
    await NativeModules.UsageStatsModule.openUsageAccessSettings();
  }
  // async function checkPermission() {
  //   try {
  //     await
   
       
  //     // if (!hasPermission) {
      
  //     // } else if(permissionChanged) {
       
  //     // }
  //   } catch (error) {
  //     return;
  //   }
  // }


  useEffect(() => {
    let appStateListener: any;

    const checkPermission = async () => {
      const permission = await NativeModules.UsageStatsModule.checkUsageStatsPermission();
      setHasPermission(permission);
    };

    appStateListener = AppState.addEventListener('change', checkPermission);

    // Limpeza na desmontagem
    return () => {
      appStateListener.remove()
  }}, []);

  useEffect(() => {
      if(hasPermission){
        fetchUsageStats();
      }
      if (!hasPermission) {
        Alert.alert(
          "Permissão para acessar as estatísticas de uso.",
          "Para o aplicativo funcionar de forma adequada é necessário que você permita ele acessaras estatísticas de uso.",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            { text: "OK", onPress: () => {
              openAcessUsageSettings()
            } },
          ],
          { cancelable: false }
        );
      }
   
  }, [hasPermission]);

  return (
    <UsageStatsContext.Provider
      value={{
        apps,
        isLoadingApps,
        totalUsageTime,
      }}
    >
      {children}
    </UsageStatsContext.Provider>
  );
}
