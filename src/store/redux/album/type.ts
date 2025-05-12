import { PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumResponse } from '../../../services/type';

export type GetAlbumDetail = PayloadAction<Album>;
export type GetAlbumDetailList = PayloadAction<AlbumResponse | null>;

export interface AlbumState {
  data: AlbumResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  albumInfo: Album | null;
}
