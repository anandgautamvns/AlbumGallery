import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackNavigationProp} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {Album} from '../services/type';
import {branding} from './../config/branding';
import AlbumDetailsScreen from './../screens/AlbumDetailsScreen';
import DashboardScreen from './../screens/DashboardScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Details: {album: Album};
};

export type NavProp<Screen extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, Screen>;

export type ScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <Text style={{color: branding.primaryColor, fontSize: 20}}>
              Dashboard
            </Text>
          ),
          headerTintColor: branding.primaryColor,
        }}
      />
      <Stack.Screen
        name="Details"
        component={AlbumDetailsScreen}
        options={{
          title: 'Album Details',
          headerTintColor: branding.primaryColor,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
