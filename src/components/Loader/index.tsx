import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color="#0000ff"
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
