import NetInfo from '@react-native-community/netinfo';
import {isEqual, isNil, trim} from 'lodash';

export const isEmptyValue = (v: any): v is null | undefined =>
  isNil(v) || trim(v) === '' || isEqual(v, {});
export const isNotEmptyValue = (v: any) => !isEmptyValue(v);

export async function checkConnection() {
  const state = await NetInfo.fetch();
  console.log('Connection type:', state);
  return {
    isConnected: state.isConnected,
    isInternetReachable: state.isInternetReachable,
    type: state.type,
    details: state.details,
    isWifiEnabled: state.isWifiEnabled,
  };
}
