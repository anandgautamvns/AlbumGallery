import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {NavProp} from '../../navigation/AppNavigation';
import {Album} from './../../services/type';

import {ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';
import {useOrientation} from '../../hooks/useOrientation';

interface Props {
  album: Album;
}

const AlbumCell: React.FC<Props> = ({album}) => {
  const navigation = useNavigation<NavProp<'Details'>>();
  const isPortrait = useOrientation();

  const handlePress = useCallback(() => {
    navigation.navigate('Details', {album});
  }, [navigation, album]);

  const imageUri = isPortrait ? album.artworkUrl60 : album.artworkUrl100;
  const validUri =
    imageUri && imageUri.startsWith('http') ? imageUri : 'fallback_image_url';

  return (
    <Card onPress={handlePress} testID="album-card">
      <Artwork
        testID="album-artwork"
        key={isPortrait ? 'portrait' : 'landscape'}
        source={{uri: validUri} as ImageSourcePropType}
      />
      <Row>
        <Title numberOfLines={1}>
          {album.collectionName || album.trackName}
        </Title>
        <Price>{`$${album.trackPrice}`}</Price>
      </Row>
      {album.artistName && <Artist>{album.artistName}</Artist>}
    </Card>
  );
};

export default memo(AlbumCell);

// Styled-components
const Card = styled.TouchableOpacity`
  flex: 1;
  margin: 8px;
  background-color: #fff;
  border-radius: 12px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  padding-bottom: 10px;
`;

const Artwork = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  resize-mode: cover;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 5px;
  width: 100%;
`;

const Title = styled.Text`
  flex: 1;
  margin-right: 8px;
  font-size: 10px;
  font-weight: 800;
  color: #000;
`;

const Price = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #000;
  flex-shrink: 0;
`;

const Artist = styled.Text`
  font-size: 10px;
  color: #666;
  padding-horizontal: 5px;
  margin-top: 4px;
`;
