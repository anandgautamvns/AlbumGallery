import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ConnectivityStatus() {
  const [connection, setConnection] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state);
    });
    return () => unsubscribe();
  }, []);

  if (!connection) {
    return <Text>Checking connection…</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Type: {connection.type}</Text>
      <Text>Connected: {connection.isConnected ? 'Yes' : 'No'}</Text>
      <Text>
        Internet reachable: {connection.isInternetReachable ? 'Yes' : 'No'}
      </Text>
    </View>
  );
}

export default ConnectivityStatus;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
