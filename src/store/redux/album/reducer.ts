import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../configureStore';
import { getAlbumListAction } from './thunk';
import { AlbumState, GetAlbumDetail, GetAlbumDetailList } from './type';

const initialState: AlbumState = {
  data: null,
  albumInfo: null,
  isLoading: false,
  isError: false,
  error: null,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    getAlbumDetail(state, action: GetAlbumDetail) {
      return {
        ...state,
        isLoading: false,
        albumInfo: action.payload,
      };
    },
    getAlbumDetailList(state, action: GetAlbumDetailList) {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAlbumListAction.pending, state => {
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      })
      .addCase(getAlbumListAction.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      })
      .addCase(getAlbumListAction.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isError: true,
          data: null,
          error: action.payload as Error,
        };
      });
  },
});

export const albumSelectors = {
  selectAlbum: (state: AppState) => state.album,
};

export default albumSlice;
