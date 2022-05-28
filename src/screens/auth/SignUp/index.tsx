import React, { FC, useCallback } from 'react';
import {
  Button as RNButton,
  Text,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';
import RNLocation, { Location } from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput } from '../../../components';
import { typography } from '../../../styles';
import { AuthStackParamList, AuthStackRouteName } from '../../../types';
import { useAuthContext } from '../../../context/auth.context';
import { Apollo } from '../../../apollo';
import { AsyncStorageKeys } from '../../../constants';

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
  const { setIsLoggedIn, setUserData } = useAuthContext();

  const [signUp] = useMutation(Apollo.mutations.signup, {
    onCompleted(data) {
      if (data.signup.accessToken) {
        AsyncStorage.setItem(
          AsyncStorageKeys.ACCESS_TOKEN,
          data.signup.accessToken,
        );
        setIsLoggedIn(true);
        setUserData(data.signup.user);
      }
    },
    onError(error) {
      Alert.alert(error.message);
    },
  });

  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const location = await getLocation();

      if (!location) {
        return Alert.alert(
          'We need to access your location in order to show relevant suggestions',
        );
      }

      signUp({
        variables: {
          createUserInput: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        },
      });
    },
  });

  const getLocation = useCallback(async (): Promise<Location | null> => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse',
      android: { detail: 'coarse' },
    });

    let location: Location | null;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your permission',
            message: 'We use your location to save it in your profile',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      location = await RNLocation.getLatestLocation({ timeout: 100 });
    } else {
      location = await RNLocation.getLatestLocation({ timeout: 100 });
    }

    return location;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
      <View style={styles.signinLink}>
        <RNButton
          title="Already have an account? Sign in"
          onPress={() => navigation.navigate(AuthStackRouteName.SignIn)}
        />
      </View>
    </KeyboardAvoidingView>
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
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SignUp;
