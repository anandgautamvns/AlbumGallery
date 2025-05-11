import {PayloadAction} from '@reduxjs/toolkit';
import {Album, AlbumResponse} from 'src/services/type';

export type GetAlbumDetail = PayloadAction<Album>;

export interface AlbumState {
  data: AlbumResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  albumInfo: Album | null;
}
