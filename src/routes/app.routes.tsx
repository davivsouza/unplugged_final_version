import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'
import { Journey } from "@screens/AppScreens/Journey";
import { Module } from "@screens/AppScreens/Journey/Module";

import { ModuleVideo } from "@screens/AppScreens/Journey/ModuleVideo";
import { BinauralSounds } from "@screens/AppScreens/BinauralSounds";

import JourneySvg from "@assets/Journey-icon.svg";
import MeditationSvg from "@assets/Meditation-icon.svg";
import ShopSvg from "@assets/shop-icon.svg";
import BinauralSvg from "@assets/Binaural-icon.svg";
import HabitsSvg from "@assets/Habits-icon.svg";
import { Box, useTheme, VStack } from "native-base";
import { Playlist } from "@screens/AppScreens/BinauralSounds/Playlist";
import { Meditations } from "@screens/AppScreens/Meditations";
import { MeditationPlayer } from "@screens/AppScreens/Meditations/MeditationPlayer";
import { Habits } from "@screens/AppScreens/Habits";
import { BinauralSound } from "@components/BinauralSound";
import { Painel } from "@screens/AppScreens/Habits/Painel";
import { MeditationIntroSlider } from "@screens/AppScreens/Meditations/MeditationIntroSlider";
import { BinauralSoundsIntroSlider } from "@screens/AppScreens/BinauralSounds/BinauralSoundsIntroSlider";
import { ContentDTO, ModuleDTO } from "../dtos/ModuleDTO";
import { ModuleContentDTO } from "../dtos/ModuleContentDTO";
import { BinauralDTO } from "../dtos/BinauralCategoryDTO";
import { FavoritesPlaylist } from "@screens/AppScreens/BinauralSounds/FavoritesPlaylist";
import { MeditationDTO } from "../dtos/MeditationDTO";
import { Profile } from "@screens/AppScreens/Profile";
import { UpdateProfile } from "@screens/AppScreens/Profile/UpdateProfile";

type AppRoutes = {
  journey: undefined;
  module: ModuleDTO
  moduleVideo: { content: ContentDTO, videoNumber: number },
  meditations: undefined,
  meditationPlayer: MeditationDTO,
  meditationIntroSlider: undefined,
  binauralSoundsIntroSlider: undefined,
  habits: undefined;
  bemestarPainel: undefined
  binaural: undefined;
  playlist: { playlistId: number }
  binauralSounds: undefined;
  binauralSound: { binaural: BinauralDTO, playlistId?: number }
  favoriteBinauralSounds: undefined
  profile: undefined
  updateProfile: undefined

};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();
export function AppRoutes() {

  return (
    <Navigator
      initialRouteName="journey"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {

          position: "absolute",
          backgroundColor: "transparent",
          shadowColor: "transparent",
          borderTopColor: "transparent",
          zIndex: 1,
          elevation: 0,
          bottom: 20,
        },
      }}
    >
      <Screen name="habits" component={Habits} options={{
        tabBarIcon: ({ focused }) => (
          <VStack position="relative">

            <HabitsSvg
              stroke="#fff"
              strokeWidth={3}
              width={30}
              height={30}
            />
            {focused && (
              <Box position="absolute" top={"170%"} w={8} h={4} bg="purple.500" borderTopLeftRadius="full" borderTopRightRadius="full" />
            )}
          </VStack>
        ),
      }} />
      <Screen name="binaural" component={BinauralSounds} options={{
        tabBarIcon: ({ focused }) => (
          <VStack position="relative">

            <BinauralSvg
              fill="#fff"
              width={40}
              height={40}
            />
            {focused && (
              <Box position="absolute" left={1} top={"140%"} w={8} h={4} bg="purple.500" borderTopLeftRadius="full" borderTopRightRadius="full" />
            )}
          </VStack>
        )
      }} />

      <Screen name="journey" component={Journey} options={{
        tabBarIcon: () => (
          <Box
            width={16}
            height={16}
            bg="purple.500"
            rounded="full"
            alignItems="center"
            justifyContent="center"

          >
            <JourneySvg fill="#fff" width={28} height={28} />
          </Box>
        )

      }} />
      <Screen name="meditations" component={Meditations} options={{
        tabBarIcon: ({ focused }) => (
          <VStack position="relative">

            <MeditationSvg
              fill="#fff"
              width={40}
              height={40}
            />
            {focused && (
              <Box position="absolute" left={1} top={"140%"} w={8} h={4} bg="purple.500" borderTopLeftRadius="full" borderTopRightRadius="full" />
            )}
          </VStack>
        )
      }} />
      <Screen name="profile" component={Profile} options={{
        tabBarIcon: ({ focused }) => (
          <VStack>

            <AntDesign name="user" size={33} color="white" />
            {focused && (
              <Box position="absolute" top={"155%"} w={8} h={4} bg="purple.500" borderTopLeftRadius="full" borderTopRightRadius="full" />
            )}
          </VStack>
        )
      }} />
      <Screen
        name="module"
        component={Module}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="moduleVideo"
        component={ModuleVideo}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="playlist"
        component={Playlist}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="meditationPlayer"
        component={MeditationPlayer}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,

        }}
      />
      <Screen
        name="binauralSound"
        component={BinauralSound}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,

        }}
      />

      <Screen
        name="bemestarPainel"
        component={Painel}

        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="meditationIntroSlider"
        component={MeditationIntroSlider}

        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="binauralSoundsIntroSlider"
        component={BinauralSoundsIntroSlider}

        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="favoriteBinauralSounds"
        component={FavoritesPlaylist}
        options={{

          tabBarButton: () => null,
        }}
      />
      <Screen
        name="updateProfile"
        component={UpdateProfile}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />

    </Navigator>
  );
}
