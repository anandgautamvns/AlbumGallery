import {useNavigation} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import AlbumCell from '..';
import {mockAlbumsData} from '../../../mockData/Album';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../hooks/useOrientation', () => ({
  useOrientation: jest.fn(() => true), // Mock portrait mode
}));

describe('AlbumCell Component', () => {
  const mockNavigation = {navigate: jest.fn()};
  const mockAlbum = mockAlbumsData[0];

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(<AlbumCell album={mockAlbum} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render album details correctly', () => {
    const {getByText, getByTestId} = render(<AlbumCell album={mockAlbum} />);

    expect(getByText('Collection 1')).toBeTruthy();
    expect(getByText('$20')).toBeTruthy();
    expect(getByText('Artist 1')).toBeTruthy();
    expect(getByTestId('album-artwork').props.source.uri).toBe(
      'https://example.com/artwork60/1.jpg',
    );
  });

  it('should navigate to the Details screen when pressed', () => {
    const {getByTestId} = render(<AlbumCell album={mockAlbum} />);

    fireEvent.press(getByTestId('album-card'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      album: mockAlbum,
    });
  });

  it('should use fallback image if artwork URL is invalid', () => {
    const invalidAlbum = {...mockAlbum, artworkUrl60: ''};
    const {getByTestId} = render(<AlbumCell album={invalidAlbum} />);

    expect(getByTestId('album-artwork').props.source.uri).toBe(
      'fallback_image_url',
    );
  });
});
