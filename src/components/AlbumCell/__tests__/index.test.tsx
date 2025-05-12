import {useNavigation} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import AlbumCell from '..';
import {useOrientation} from '../../../hooks/useOrientation';
import {mockAlbumsData} from '../../../mockData/Album';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../hooks/useOrientation', () => ({
  useOrientation: jest.fn(),
}));

describe('AlbumCell', () => {
  const mockNavigate = jest.fn();
  const mockAlbum = mockAlbumsData[0];

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
    (useOrientation as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in portrait mode', () => {
    const {getByText, getByTestId} = render(<AlbumCell album={mockAlbum} />);

    expect(getByTestId('Artwork').props.source.uri).toBe(
      mockAlbum.artworkUrl100,
    );
    expect(getByText(mockAlbum?.collectionName || '')).toBeTruthy();
    expect(getByText(`$${mockAlbum?.trackPrice || ''}`)).toBeTruthy();
    expect(getByText(mockAlbum?.artistName || '')).toBeTruthy();
  });

  it('renders correctly in landscape mode', () => {
    (useOrientation as jest.Mock).mockReturnValue(false);
    const {getByTestId} = render(<AlbumCell album={mockAlbum} />);

    expect(getByTestId('Artwork').props.source.uri).toBe(
      mockAlbum.artworkUrl30,
    );
  });

  it('navigates to Details screen on press', () => {
    const {getByTestId} = render(<AlbumCell album={mockAlbum} />);
    fireEvent.press(getByTestId('Card'));

    expect(mockNavigate).toHaveBeenCalledWith('Details', {album: mockAlbum});
  });

  it('does not render artist name if not provided', () => {
    const albumWithoutArtist = {...mockAlbum, artistName: undefined};
    const {queryByText} = render(<AlbumCell album={albumWithoutArtist} />);

    expect(queryByText(mockAlbum.artistName || '')).toBeNull();
  });
});
