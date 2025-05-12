module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    // By default this would be /node_modules\/(?!react-native)\/.*/,
    // But we need react-redux, react-redux-toolkit, and any other ESM modules:
    'node_modules/(?!(react-native|@react-native|react-navigation|react-redux|@reduxjs/toolkit|react-redux-toolkit-persist)/)',
  ],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
  },
};
