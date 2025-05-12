import React, {memo} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';
import {ScreenProp} from '../../navigation/AppNavigation';
import {Album} from '../../services/type';
import {isNotEmptyValue} from './../../utils';

type Props = ScreenProp<'Details'>;

const AlbumDetailsScreen: React.FC<Props> = ({route}) => {
  const details = route.params.album as Album;

  if (!isNotEmptyValue(details)) {
    return <EmptyScreen message="No albums available" />;
  }
  const validUri =
    details?.artworkUrl100 && details?.artworkUrl100.startsWith('http')
      ? details.artworkUrl100
      : 'fallback_image_url';
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: validUri}}
        style={styles.image}
        resizeMode="cover"
        testID="album-image"
      />

      <Text style={styles.title}>{details?.trackName || ''}</Text>
      <Text style={styles.subtitle}>{details?.collectionName || ''}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Director/Creators:</Text>
        <Text style={styles.infoValue}>{details?.artistName || ''}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Genre:</Text>
        <Text style={styles.infoValue}>{details?.primaryGenreName || ''}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Release Date:</Text>
        <Text style={styles.infoValue}>
          {new Date(details?.releaseDate).toDateString()}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Price:</Text>
        <Text style={styles.infoValue}>
          ${details?.trackPrice || 0} (HD: ${details?.trackHdPrice || 0})
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Rating:</Text>
        <Text style={styles.infoValue}>
          {details?.contentAdvisoryRating || ''}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>About this Movie</Text>
      <Text style={styles.description}>{details?.longDescription || ''}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(details?.trackViewUrl || '')}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(AlbumDetailsScreen);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 4,
  },
  infoLabel: {
    fontWeight: '600',
    width: 120,
  },
  infoValue: {
    flex: 1,
    flexWrap: 'wrap',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'left',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#0070c9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
