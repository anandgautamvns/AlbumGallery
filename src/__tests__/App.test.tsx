import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../store/redux/configureStore';
import App from './../App';

jest.mock('../main', () => {
  return () => <></>; // Mock the Main component
});

jest.mock('react-native/Libraries/NewAppScreen', () => ({
  Colors: {
    darker: '#000000',
    lighter: '#ffffff',
  },
}));

describe('App Component', () => {
  it('renders correctly', () => {
    const queryClient = new QueryClient();
    const {toJSON} = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
