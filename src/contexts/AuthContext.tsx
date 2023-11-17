import { createContext, useState, useEffect } from 'react'
import { UserDTO } from '../dtos/UserDTO';
import { userStorageGet, userStorageRemove, userStorageSave } from '../storage/userStorage';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '../storage/storageAuthToken';
import { api } from '../services/api';
import { BinauralSoundsFavoriteDTO } from '../dtos/BinauralSoundsFavoriteDTO';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export type AuthContextDataProps = {
  user: UserDTO;
  tryToLogin: boolean
  setTryToLogin: (bool: boolean) => void;
  favoritesBinauralSounds: BinauralSoundsFavoriteDTO[]
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getFavoriteBinauralSounds: () => Promise<void>;
  updateUserProfile: (updatedUser: UserDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContext = createContext({} as AuthContextDataProps)


export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState({} as UserDTO);
  const [favoritesBinauralSounds, setFavoritesBinauralSounds] = useState<BinauralSoundsFavoriteDTO[]>([]);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  const [tryToLogin, setTryToLogin] = useState(false)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }
  async function getFavoriteBinauralSounds() {
    const { data } = await api.get(`/binaurals/getFavorite/${user.id}`)
    setFavoritesBinauralSounds(data);

  }
  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)


      await userStorageSave(userData)
      await storageAuthTokenSave(token)

    } catch (error) {
      throw error

    } finally {
      setIsLoadingUserStorageData(false)

    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true)
      const { data } = await api.post("/users/auth", { email, password });


      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token);
        setTryToLogin(false)
      }



    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false)
    }
  }


  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await userStorageRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error

    } finally {

      setIsLoadingUserStorageData(false)
    }

  }

  async function updateUserProfile(updatedUser: UserDTO) {
    try {
      setUser(updatedUser)
      await userStorageSave(updatedUser)
      loadUserData()

    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await userStorageGet();
      const token = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }



  useEffect(() => {
    loadUserData();

  }, []);


  return (
    <AuthContext.Provider value={{ user, isLoadingUserStorageData, signIn, signOut, favoritesBinauralSounds, getFavoriteBinauralSounds, updateUserProfile, tryToLogin, setTryToLogin }}>
      {children}
    </AuthContext.Provider>
  );
}