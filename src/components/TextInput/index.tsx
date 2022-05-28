import React, { FC } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles';

type TextInputProps = RNTextInputProps & {
  error?: string;
  touched?: boolean;
};

const TextInput: FC<TextInputProps> = ({ error, touched, ...otherProps }) => {
  const validationColor = !touched
    ? colors.border
    : error
    ? colors.error
    : colors.border;

  return (
    <>
      <View style={{ ...styles.container, borderColor: validationColor }}>
        {/* <View style={styles.icon}>
        <Icon name={icon} color={validationColor} size={16} />
      </View> */}
        <View style={styles.textContainer}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            {...otherProps}
          />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 0.7,
    padding: 8,
  },
  error: {
    fontSize: 10,
    marginTop: 5,
    color: colors.error,
  },
  icon: { padding: 8 },
  textContainer: { flex: 1 },
});

export default TextInput;
