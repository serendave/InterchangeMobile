import React, { FC } from 'react';
import { Text, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput } from '../../../components';
import { typography } from '../../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, AuthStackRouteName } from '../../../types';

const loginSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Your name should include at least 3 chars')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Your name should include at least 3 chars')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(4, 'Password should be more than 4 chars')
    .max(20, 'Password should be less than 20 chars')
    .required('Required'),
});

type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthStackRouteName.SignUp
>;

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
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
        <Text style={styles.loginText}>Sign up now</Text>
        <View style={styles.textBox}>
          <TextInput
            placeholder="First Name"
            keyboardAppearance="dark"
            onChangeText={handleChange('firstName')}
            error={errors.firstName}
            touched={touched.firstName}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            placeholder="Last Name"
            keyboardAppearance="dark"
            onChangeText={handleChange('lastName')}
            error={errors.lastName}
            touched={touched.lastName}
          />
        </View>
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
        <Button label="Sign Up" onPress={handleSubmit} />
      </View>
      <Text
        style={styles.signinLink}
        onPress={() => navigation.navigate(AuthStackRouteName.SignIn)}>
        Already have an account? Sign in
      </Text>
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
  signinLink: {
    color: '#3588e0',
    marginBottom: 20,
  },
});

export default SignUp;
