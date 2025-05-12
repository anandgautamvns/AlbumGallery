import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface EmptyScreenProps {
  message?: string;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({
  message = 'No Data available',
}) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(EmptyScreen);
