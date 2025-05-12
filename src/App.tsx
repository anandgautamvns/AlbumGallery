import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Suspense, lazy} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Loading from './components/Loader';
import store from './store/redux/configureStore';
const Main = lazy(() => import('./main'));

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <SafeAreaProvider>
            <Main backgroundStyle={backgroundStyle} />
          </SafeAreaProvider>
        </Suspense>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
