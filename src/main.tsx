import React from 'react';
import AppNavigation from './navigation/AppNavigation';

import {StyleSheet, View} from 'react-native';

interface Props {
  backgroundStyle: any;
}

const Main: React.FC<Props> = ({backgroundStyle}) => {
  return (
    <View style={{...backgroundStyle, ...styles.container}}>
      <AppNavigation />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
