import {useNetInfo} from '@react-native-community/netinfo';
import {render} from '@testing-library/react-native';
import React from 'react';
import DashboardScreen from '..';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/redux/configureStore';

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
}));

jest.mock('../../../store/redux/configureStore', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../../hooks/useOrientation', () => ({
  useOrientation: jest.fn(() => true), // Mock portrait mode
}));

jest.mock('../../../store/AsyncStorage', () => ({
  getStoredAlbums: jest.fn(),
}));

jest.mock('../../../store/redux/album/thunk', () => ({
  getAlbumListAction: jest.fn(),
}));

describe('DashboardScreen Component', () => {
  const mockDispatch = jest.fn();
  const mockAlbumData = {
    data: {results: [{trackId: 1, collectionName: 'Test Album'}]},
    isLoading: false,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(mockAlbumData);
    (useNetInfo as jest.Mock).mockReturnValue({isConnected: true});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Loading component when loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      ...mockAlbumData,
      isLoading: true,
    });
    const {getByTestId} = render(<DashboardScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render the ErrorScreen component when there is an error', () => {
    const mockError = new Error('Test error');
    (useAppSelector as jest.Mock).mockReturnValue({
      ...mockAlbumData,
      isError: true,
      error: mockError,
    });
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('Oops!')).toBeTruthy();
    expect(getByText('Test error')).toBeTruthy();
  });

  it('should render the FlatList with AlbumCell components when data is available', () => {
    const {getByTestId} = render(<DashboardScreen />);
    expect(getByTestId('album-list')).toBeTruthy();
    expect(getByTestId('album-cell-1')).toBeTruthy();
  });

  it('should render "No albums available" when there is no data', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      ...mockAlbumData,
      data: {results: []},
    });
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('No albums available')).toBeTruthy();
  });

  it('should call getAlbumListAction when the network is connected', () => {
    render(<DashboardScreen />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<DashboardScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
