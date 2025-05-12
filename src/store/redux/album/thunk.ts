import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAlbums } from './../../../services/api';
import { AlbumRequest } from './../../../services/type';
import { storeAlbums } from './../../../store/AsyncStorage';

export const getAlbumListAction = createAsyncThunk(
  'album/getAlbumListAction',
  async (request: AlbumRequest, {rejectWithValue}) => {
    try {
      const data = await fetchAlbums(request);
      storeAlbums(data);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
