import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { getToken, refreshToken } from "./src/services/account-services";

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

export default function App() {
  const [ msg, setMsg ] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        try {
          await refreshToken();
          // код коли сесія продовжилась
          setMsg("Session continue");
        } catch (error) {
          // код коли сесія завержується
          setMsg("Session closed");
        }
      } else {
        // код якщо токену нема
        setMsg("Token not found");
      }
    };

    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 25 : 0
  },
});
