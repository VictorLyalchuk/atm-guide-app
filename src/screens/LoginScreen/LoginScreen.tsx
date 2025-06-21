import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Loading from '../../components/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { loginValidationSchema } from '../../validation/auth';
import { login } from '../../services/account-services';
import { ILogin } from '../../types/auth';
import ErrorMessage from '../LoginScreen/ErrorMessage';
import { Snackbar } from 'react-native-paper';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleLogin = async (values: ILogin) => {
    setIsLoading(true);
    try {
      await login(values);
      navigation.replace('Home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Сталася помилка');
      }
      setSnackbarVisible(true);
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

        {/* <TouchableOpacity style={styles.enterSystemButton}>
          <Text style={styles.enterSystemButtonText}>Вхід до системи</Text>
        </TouchableOpacity> */}
        <Text>{errorMessage && <ErrorMessage message={errorMessage} />}</Text>

        <Formik
          initialValues={{ email: '', password: '', authType: 'mobile' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => { handleLogin(values); }}
        >

          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Логін</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Введіть логін"
                />
                <ErrorMessage message={touched.email ? errors.email : null} />
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
                <ErrorMessage message={touched.password ? errors.password : null} />
              </View>
              <TouchableOpacity style={styles.enterSystemButton} onPress={() => { handleSubmit() }}>
                <Text style={styles.enterSystemButtonText}>Вхід до системи</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Функціонал у розробці')}>
                <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.loginButton} onPress={() => {handleSubmit()}}>
                <Text style={styles.loginButtonText}>Вхід</Text>

              </TouchableOpacity> */}
            </>
          )}
        </Formik>

        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Вихід</Text>
        </TouchableOpacity>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'Закрити',
            onPress: () => setSnackbarVisible(false),
          }}
          style={{ backgroundColor: '#d32f2f' }}
        >
          <Text>{errorMessage}</Text>
        </Snackbar>

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
