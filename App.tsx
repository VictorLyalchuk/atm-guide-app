import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getToken, refreshToken } from "./src/services/account-services";

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
    <View style={styles.container}>
      <Text>{msg}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
