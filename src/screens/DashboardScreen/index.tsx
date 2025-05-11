import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import AlbumCell from '../../components/AlbumCell';
import ErrorScreen from '../../components/ErrorScreen';
import Loading from '../../components/Loader';
import {useQueryRequest} from '../../hooks/useQueryRequest';
import {fetchAlbums} from './../../services/api';
import {Album, AlbumRequest, AlbumResponse} from './../../services/type';

const DashboardScreen: React.FC = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'landscape'
      : 'portrait',
  );
  const numColumns = orientation === 'portrait' ? 2 : 4;
  const {data, isLoading, isError, error, refetch} = useQueryRequest<
    AlbumResponse,
    AlbumRequest
  >(
    ['albums'],
    fetchAlbums,
    {term: 'jack johnson', limit: 100},
    {staleTime: 300000},
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        Dimensions.get('window').width > Dimensions.get('window').height
          ? 'landscape'
          : 'portrait',
      );
    };

    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const renderItem = ({item}: {item: Album}) => {
    return <AlbumCell album={item} />;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || isError) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  console.log('DashboardScreen', {data, isLoading, isError, error});
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results || []}
        keyExtractor={item => item.trackId.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        onEndReached={() => {
          console.log('Fetch more data...');
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
        contentContainerStyle={styles.list}
      />
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
