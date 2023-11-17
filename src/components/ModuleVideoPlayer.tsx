import { VStack, Pressable, useTheme } from "native-base";
import { Video, ResizeMode } from 'expo-av'
import { useRef, useState } from "react";
import * as ScreenOrientation from 'expo-screen-orientation'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import GoBackSvg from "@assets/goback.svg";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { imagesUrl, localUrl } from "@utils/baseUrls";

type Props = {
  videoId: number
}

const PHONE_SCREEN_SIZE = Dimensions.get('screen').width

export function ModuleVideoPlayer({ videoId }: Props) {

  const [position, setPosition] = useState(0);
  const videoRef = useRef<any>(null);
  const { goBack } = useNavigation<AppNavigatorRoutesProps>()
  const { colors } = useTheme()



  async function handleNavigate() {
    if (videoRef.current) {
      await videoRef.current.stopAsync();
      await videoRef.current.setPositionAsync(0);
      setPosition(0);
      goBack();
    }
  }

  return (
    <VStack >
      <Pressable
        padding={6}
        onPress={handleNavigate}
        top={4}
        left={0}
        zIndex={20}
        style={{ elevation: 10 }}
        position="absolute"
      >
        <GoBackSvg fill={colors.purple[700]} />
      </Pressable>
      <Video
        positionMillis={position}

        ref={videoRef}
        style={{
          alignSelf: 'center',
          width: PHONE_SCREEN_SIZE,
          height: 300,
          backgroundColor: '#221E2B',

        }}
        source={{
          uri: `${localUrl}/api/contents/${videoId}`,
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        shouldPlay
        onFullscreenUpdate={async (update) => {

          if (update.fullscreenUpdate <= 1) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
          } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
          }

        }}
      />

    </VStack>
  )
}  