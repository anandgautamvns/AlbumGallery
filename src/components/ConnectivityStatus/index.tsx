import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

export default function ConnectivityStatus() {
  const [connection, setConnection] = useState<NetInfoState | null>(null);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state);
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  if (!connection) {
    return <Text>Checking connection…</Text>;
  }

  return (
    <View style={{padding: 16}}>
      <Text>Type: {connection.type}</Text>
      <Text>Connected: {connection.isConnected ? 'Yes' : 'No'}</Text>
      <Text>
        Internet reachable: {connection.isInternetReachable ? 'Yes' : 'No'}
      </Text>
    </View>
  );
}
