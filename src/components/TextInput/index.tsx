import React, { FC } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
} from 'react-native';

type TextInputProps = RNTextInputProps & {
  error?: string;
  touched?: boolean;
};

const TextInput: FC<TextInputProps> = ({ error, touched, ...otherProps }) => {
  const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';

  return (
    <View style={{ ...styles.container, borderColor: validationColor }}>
      <View style={styles.icon}>
        {/* <Icon name={icon} color={validationColor} size={16} /> */}
      </View>
      <View style={styles.textContainer}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    borderColor: '#223e4b',
    borderWidth: 0.7,
    padding: 8,
  },
  icon: { padding: 8 },
  textContainer: { flex: 1 },
});

export default TextInput;
