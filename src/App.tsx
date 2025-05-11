import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Suspense, lazy} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loading from './components/Loader';
const Main = lazy(() => import('./main'));

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
  );
}

export default App;
