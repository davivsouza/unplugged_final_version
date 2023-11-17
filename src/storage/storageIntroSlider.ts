import AsyncStorage from "@react-native-async-storage/async-storage";

import { INTRO_SLIDER_STORAGE } from "./storageConfig";
import { IntroSliderDTO } from "../dtos/IntroSliderDTO";


export async function introSliderStorageSave(introSlider: IntroSliderDTO) {
  const storedSliders = await introSlidersGetAll();


  const storage = JSON.stringify([...storedSliders, introSlider]);
  await AsyncStorage.setItem(INTRO_SLIDER_STORAGE, storage)
}

// export async function introSliderSaveStorageGet() {
//   const storage = await AsyncStorage.getItem(INTRO_SLIDER_STORAGE);

//   const user = storage ? JSON.parse(storage) : null;

//   return user;
// }

export async function introSliderSaveStorageRemove() {
  await AsyncStorage.removeItem(INTRO_SLIDER_STORAGE)
}

export async function introSlidersGetAll() {
  try {
    const storage = await AsyncStorage.getItem(INTRO_SLIDER_STORAGE);

    const sliders: IntroSliderDTO[] = storage ? JSON.parse(storage) : [];
    return sliders;

  } catch (error) {
    throw error;
  }
}