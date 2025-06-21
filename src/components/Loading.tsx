import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.leftTextRenome}>RENOME</Text>
        <View style={styles.rightLabBtn}>
          <Text style={styles.rightTextLab}>LAB</Text>
        </View>
      </View>
      <ActivityIndicator size="large" color="white" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#059c75',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    width: 200,
  },
  leftTextRenome: {
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  rightLabBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 5,
  },
  rightTextLab: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
