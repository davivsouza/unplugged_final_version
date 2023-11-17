import AsyncStorage from "@react-native-async-storage/async-storage";

import { APPS_TIMER_CONTROL } from "./storageConfig";
import { AppTimer } from "@contexts/TimerControlContext";


export async function timerControlStorageSave(app: AppTimer) {
  const storedApps = await timerControlGetApps();
  const isAlreadyExist = storedApps.filter(timer => timer.appName !== app.appName)

  if (isAlreadyExist) {
    const storage = JSON.stringify([...isAlreadyExist, app])
    await AsyncStorage.setItem(APPS_TIMER_CONTROL, storage)
  } else {
    const storage = JSON.stringify([...storedApps, app])
    await AsyncStorage.setItem(APPS_TIMER_CONTROL, storage)
  }


}



export async function timerControlStorageRemoveSpecificAppTimer(app: AppTimer) {
  const storedApps = await timerControlGetApps();
  const filtered = storedApps.filter(timer => timer.appName !== app.appName)
  await AsyncStorage.setItem(APPS_TIMER_CONTROL, JSON.stringify(filtered))
}


export async function timerControlSaveStorageRemove() {
  await AsyncStorage.removeItem(APPS_TIMER_CONTROL)
}

export async function timerControlGetApps() {
  try {
    const storage = await AsyncStorage.getItem(APPS_TIMER_CONTROL);

    const apps: AppTimer[] = storage ? JSON.parse(storage) : [];
    return apps;

  } catch (error) {
    throw error;
  }
}