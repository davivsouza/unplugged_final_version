import { BinauralContent } from "@components/BinauralContent";
import { ScreenContainer } from "@components/ScreenContainer";
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { introSlidersGetAll } from "../../../storage/storageIntroSlider";
export function BinauralSounds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  async function checkIfUserHasAlreadySeenTheIntroSlider() {
    const slidersThatUserHasWatched = await introSlidersGetAll()
    const filter = slidersThatUserHasWatched.filter(slider => slider.introSlider === 'binaural' && slider.watched)

    if (filter.length > 0) {
      if (filter[0].watched) {
        navigate('binaural')
      }
    } else {
      navigate('binauralSoundsIntroSlider')
    }

  }
  useEffect(() => {
    checkIfUserHasAlreadySeenTheIntroSlider()
  }, [])



  return (
    <ScreenContainer>
      <BinauralContent />
    </ScreenContainer>
  );
}
