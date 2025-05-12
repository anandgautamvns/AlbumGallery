import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlbumResponse} from '../../services/type';

const ALBUMS_KEY = 'albums_list';

export const storeAlbums = async (list: AlbumResponse) => {
  try {
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(list));
  } catch {
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(null));
  }
};

export const getStoredAlbums = async (): Promise<AlbumResponse | null> => {
  try {
    const raw = await AsyncStorage.getItem(ALBUMS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const removeAlbums = async () => {
  try {
    await AsyncStorage.removeItem(ALBUMS_KEY);
  } catch {
    return null;
  }
};
