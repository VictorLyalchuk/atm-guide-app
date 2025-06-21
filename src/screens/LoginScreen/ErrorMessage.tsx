import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ErrorMessageProps {
  message?: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.errorContainer}>
      <Icon name="error-outline" size={16} color="#b91c1c" />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 6,
  },
  errorText: {
    color: '#b91c1c',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
});

export default ErrorMessage;
