import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // імітуємо перевірку токена
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 сек
      setIsAppLoading(false);
    };

    initializeApp();
  }, []);

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
