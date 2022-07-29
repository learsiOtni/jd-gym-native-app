import { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Navigator from './navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf')
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
      setIsLoading(false);
    }
  }, [isFontsLoaded]);

  if(!isLoading) {
    return <Navigator />
  }

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
        <Text>Put Splash Here</Text>
    </View>
  )
}