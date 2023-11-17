import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";


export async function userStorageSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function userStorageGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user = storage ? JSON.parse(storage) : null;

  return user;
}

export async function userStorageRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}