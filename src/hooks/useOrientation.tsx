import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [isPortrait, setPortrait] = useState(
    () => Dimensions.get('window').height >= Dimensions.get('window').width,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      const {width, height} = Dimensions.get('window');
      setPortrait(height >= width);
    });
    return () => subscription.remove();
  }, []);

  return isPortrait;
};
