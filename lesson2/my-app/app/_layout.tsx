import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Appearance } from 'react-native';/* exposes the appearance of the device */
/*import { useColorScheme } from '@/hooks/useColorScheme'; don't need this because using Appearance instead of that*/
 import {Colors} from '@/constants/Colors';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
      <Stack screenOptions={{ headerStyle: { backgroundColor: theme.background },headerTintColor: theme.text,headerShadowVisible: false}}>
      {/*<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(coffee)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />*/}

        /* You can add more stack screens here : these are links to other screens */

        {/*<Stack.Screen name= "index" options={{ title: 'Home', headerShown: false }}/>
        <Stack.Screen name= "contact" options={{ title: 'Contact Us' }}/>*/}
        <Stack.Screen name="index" options={{ headerShown: false,title: 'Home'}}></Stack.Screen>
        <Stack.Screen name="contact" options={{ headerShown: false,title: 'Contact',headerTitle: 'Contact Us'}}></Stack.Screen>
        <Stack.Screen name="menu" options={{ headerShown: true,title: 'Menu',headerTitle: 'Coffee Shop Menu'}}></Stack.Screen>
        <Stack.Screen name="+not-found" options={{ headerShown: false}}></Stack.Screen>
      </Stack>
     /* <StatusBar style="auto" />*/
      );
}
