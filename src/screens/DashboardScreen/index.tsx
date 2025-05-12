import {useNetInfo} from '@react-native-community/netinfo';
import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AlbumCell from '../../components/AlbumCell';
import ErrorScreen from '../../components/ErrorScreen';
import Loading from '../../components/Loader';
import {useOrientation} from '../../hooks/useOrientation';
import {getStoredAlbums} from '../../store/AsyncStorage';
import {getAlbumListAction} from '../../store/redux/album/thunk';
import {useAppDispatch, useAppSelector} from '../../store/redux/configureStore';
import {selectors} from '../../store/redux/rootReducer';
import {isNotEmptyValue} from '../../utils';
import {Album, AlbumResponse} from './../../services/type';

const DashboardScreen: React.FC = () => {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  const isPortrait = useOrientation();
  const albumData = useAppSelector(selectors.selectAlbum);
  const {data, isLoading, isError, error} = albumData;
  const [offlineData, setOfflineData] = useState<AlbumResponse | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const numColumns = isPortrait ? 1 : 2;
  /* const {data, isLoading, isError, error, refetch} = useQueryRequest<
    AlbumResponse,
    AlbumRequest
  >(
    ['albums'],
    fetchAlbums,
    {term: 'jack johnson', limit: 100},
    {staleTime: 300000},
  ); */

  const getAlbumList = () => {
    dispatch(getAlbumListAction({term: 'jack johnson', limit: 100}))
      .then(response => {
        console.log('Album list fetched', response);
        setIsOfflineMode(false); // Reset offline mode
      })
      .catch(error => {
        console.error('Error fetching album list', error);
      });
  };

  const fetchOfflineData = async () => {
    const storedAlbums = await getStoredAlbums();
    if (isNotEmptyValue(storedAlbums)) {
      setOfflineData(storedAlbums);
      setIsOfflineMode(true);
    } else {
      console.error('No offline data available');
    }
  };

  useEffect(() => {
    if (netInfo.isConnected) {
      console.log('Network is connected');
      getAlbumList();
    } else {
      console.log('Network is not connected');
      fetchOfflineData();
    }
  }, [netInfo]);

   const renderItem = ({item}: {item: Album}) => {
     return <AlbumCell album={item} />;
   };

   if (isLoading) {
     return <Loading />;
   }

   if (error || isError) {
     return <ErrorScreen error={error} onRetry={getAlbumList} />;
   }

  const generateRenderItemId = (item: Album) => {
    const prefix = isPortrait ? 'portrait' : 'landscape';
    return item?.trackId
      ? `${prefix}-${item.trackId.toString()}`
      : `${prefix}-${Math.random().toString(36).substring(7)}`;
  };

  const albumList = isOfflineMode ? offlineData?.results : data?.results;

  console.log('DashboardScreen', {
    data,
    isLoading,
    isError,
    error,
    albumData,
    isPortrait,
  });
  return (
    <View style={styles.container}>
      {albumList && albumList.length > 0 ? (
        <FlatList
          key={isPortrait ? 'portrait' : 'landscape'}
          data={albumList}
          keyExtractor={item => generateRenderItemId(item)}
          renderItem={renderItem}
          numColumns={numColumns}
          extraData={isPortrait}
          onEndReached={() => {
            console.log('Fetch more data...');
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.center}>
          <Text>No albums available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background for contrast
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {padding: 10},
});

export default memo(DashboardScreen);
