import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Loading from '../../components/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { loginValidationSchema } from '../../validation/auth';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async (values: { login: string; password: string }) => {
    setIsLoading(true);
    try {
      // Імітація запиту на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigation.replace('Home');
    } catch (error) {
      alert('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rightPane}>
        <View style={styles.header}>
          <Text style={styles.rightTextRenome}>RENOME</Text>
          <Text style={styles.rightTextLab}>LAB</Text>
        </View>
        <View style={styles.separator} />

        <TouchableOpacity style={styles.enterSystemButton}>
          <Text style={styles.enterSystemButtonText}>Вхід до системи</Text>
        </TouchableOpacity>

        <Formik
          initialValues={{ login: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Логін</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('login')}
                  onBlur={handleBlur('login')}
                  value={values.login}
                  placeholder="Введіть логін"
                />
                {touched.login && errors.login && (
                  <Text style={styles.errorText}>{errors.login}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Пароль</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Введіть пароль"
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity onPress={() => alert('Функціонал у розробці')}>
                <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit as any}>
                <Text style={styles.loginButtonText}>Вхід</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Вихід</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ccc',
  },
  rightPane: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightTextRenome: {
    color: '#059c75',
    fontWeight: 'bold',
    fontSize: 28,
  },
  rightTextLab: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 8,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  enterSystemButton: {
    backgroundColor: '#059c75',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  enterSystemButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#eee',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  forgotPasswordText: {
    color: '#059c75',
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exitButton: {
    backgroundColor: '#059c75',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
