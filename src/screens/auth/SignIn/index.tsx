import React, { FC } from 'react';
import { Text, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput } from '../../../components';
import { typography } from '../../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, AuthStackRouteName } from '../../../types';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(4, 'Password should be more than 4 chars')
    .max(20, 'Password should be less than 20 chars')
    .required('Required'),
});

type SignInProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRouteName.SignIn
>;

const SignIn: FC<SignInProps> = () => {
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values =>
      Alert.alert(`Email: ${values.email}, Password: ${values.password}`),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Interchange.io</Text>
      <View style={styles.loginBox}>
        <Text style={styles.loginText}>Sign In</Text>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange('email')}
            error={errors.email}
            touched={touched.email}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            keyboardAppearance="dark"
            returnKeyType="done"
            returnKeyLabel="done"
            onChangeText={handleChange('password')}
            onSubmitEditing={handleSubmit}
            error={errors.password}
            touched={touched.password}
          />
        </View>
        <Button label="Sign In" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
    fontSize: typography.h1,
  },
  loginBox: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loginText: {
    marginTop: 100,
    fontSize: typography.h4,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textBox: {
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
});

export default SignIn;
