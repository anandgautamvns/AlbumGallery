export interface Album {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  trackName: string;
  artistName?: string;
  collectionName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  collectionArtistId?: number;
  collectionArtistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating?: string;
  shortDescription?: string;
  longDescription?: string;
  hasITunesExtras: boolean;
}

export interface AlbumRequest {
  term: string;
  limit?: number;
}

export interface AlbumResponse {
  resultCount: number;
  results: Album[];
}
