import {Album, AlbumResponse} from '../services/type';

export const generateMockAlbums = (count: number): Album[] => {
  const mockAlbums: Album[] = [];
  for (let i = 1; i <= count; i++) {
    mockAlbums.push({
      wrapperType: 'track',
      kind: 'feature-movie',
      collectionId: 1000000000 + i,
      trackId: 2000000000 + i,
      artistName: `Artist ${i}`,
      collectionName: `Collection ${i}`,
      trackName: `Track ${i}`,
      collectionCensoredName: `Censored Collection ${i}`,
      trackCensoredName: `Censored Track ${i}`,
      collectionArtistId: 3000000000 + i,
      collectionArtistViewUrl: `https://example.com/artist/${i}`,
      collectionViewUrl: `https://example.com/collection/${i}`,
      trackViewUrl: `https://example.com/track/${i}`,
      previewUrl: `https://example.com/preview/${i}.mp4`,
      artworkUrl30: `https://example.com/artwork30/${i}.jpg`,
      artworkUrl60: `https://example.com/artwork60/${i}.jpg`,
      artworkUrl100: `https://example.com/artwork100/${i}.jpg`,
      collectionPrice: parseFloat((Math.random() * 20).toFixed(2)),
      trackPrice: parseFloat((Math.random() * 20).toFixed(2)),
      trackRentalPrice: parseFloat((Math.random() * 5).toFixed(2)),
      collectionHdPrice: parseFloat((Math.random() * 25).toFixed(2)),
      trackHdPrice: parseFloat((Math.random() * 25).toFixed(2)),
      trackHdRentalPrice: parseFloat((Math.random() * 5).toFixed(2)),
      releaseDate: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toISOString(),
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 10,
      trackNumber: i,
      trackTimeMillis: Math.floor(Math.random() * 10000000),
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Action & Adventure',
      contentAdvisoryRating: 'PG-13',
      shortDescription: `Short description for track ${i}`,
      longDescription: `Long description for track ${i}. This is a detailed description of the track.`,
      hasITunesExtras: Math.random() > 0.5,
    });
  }
  return mockAlbums;
};

export const generateMockAlbumList = (count: number): AlbumResponse => {
  return {
    resultCount: count,
    results: generateMockAlbums(count),
  };
};

// Example usage:
export const mockAlbumsData = generateMockAlbums(5);
export const mockAlbumList = generateMockAlbumList(5);
