import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Linking} from 'react-native';
import AlbumDetailsScreen from '../index';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('AlbumDetailsScreen Component', () => {
  const mockRoute = {
    params: {
      album: {
        artworkUrl100: 'https://example.com/artwork.jpg',
        trackName: 'Test Track',
        collectionName: 'Test Collection',
        artistName: 'Test Artist',
        primaryGenreName: 'Action',
        releaseDate: '2023-01-01T00:00:00Z',
        trackPrice: 9.99,
        trackHdPrice: 14.99,
        contentAdvisoryRating: 'PG-13',
        longDescription: 'This is a test description.',
        trackViewUrl: 'https://example.com/track',
      },
    },
  };

  const mockEmptyRoute = {
    params: {
      album: null,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the EmptyScreen when album details are not available', () => {
    const {getByText} = render(<AlbumDetailsScreen route={mockEmptyRoute} />);
    expect(getByText('No albums available')).toBeTruthy();
  });

  it('should render album details correctly', () => {
    const {getByText, getByTestId} = render(
      <AlbumDetailsScreen route={mockRoute} />,
    );
    expect(getByTestId('album-image').props.source.uri).toBe(
      mockRoute.params.album.artworkUrl100,
    );
    expect(getByText('Test Track')).toBeTruthy();
    expect(getByText('Test Collection')).toBeTruthy();
    expect(getByText('Test Artist')).toBeTruthy();
    expect(getByText('Action')).toBeTruthy();
    expect(getByText('Mon Jan 02 2023')).toBeTruthy(); // Adjusted for date formatting
    expect(getByText('$9.99 (HD: $14.99)')).toBeTruthy();
    expect(getByText('PG-13')).toBeTruthy();
    expect(getByText('This is a test description.')).toBeTruthy();
  });

  it('should call Linking.openURL when the View button is pressed', () => {
    const {getByText} = render(<AlbumDetailsScreen route={mockRoute} />);
    fireEvent.press(getByText('View'));
    expect(Linking.openURL).toHaveBeenCalledWith(
      mockRoute.params.album.trackViewUrl,
    );
  });

  it('should use fallback image if artwork URL is invalid', () => {
    const invalidAlbumRoute = {
      params: {
        album: {
          ...mockRoute.params.album,
          artworkUrl100: '',
        },
      },
    };
    const {getByTestId} = render(
      <AlbumDetailsScreen route={invalidAlbumRoute} />,
    );
    expect(getByTestId('album-image').props.source.uri).toBe(
      'fallback_image_url',
    );
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<AlbumDetailsScreen route={mockRoute} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
