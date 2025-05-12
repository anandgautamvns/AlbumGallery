// jest.setup.js
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';



// Mock out ActivityIndicator so tests don’t pull in RN’s private ESM modules:
jest.mock(
  'react-native/Libraries/Components/ActivityIndicator/ActivityIndicator',
  () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      __esModule: true,
      // Export a no-op component that renders a <View testID="ActivityIndicator" />
      default: (props) =>
        React.createElement(
          View,
          { testID: props.testID || 'ActivityIndicator' },
          null
        ),
    };
  }
);
