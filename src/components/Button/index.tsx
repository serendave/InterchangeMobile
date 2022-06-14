import React, { FC } from 'react';
import {
  ButtonProps as RNButtonProps,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles';

type ButtonProps = Omit<RNButtonProps, 'title'> & {
  label: string;
  color?: string;
  buttonStyles?: Record<string, any>;
  textStyles?: Record<string, any>;
  uppercase?: boolean;
  onPress?: () => void;
};

const Button: FC<ButtonProps> = ({
  buttonStyles,
  textStyles,
  uppercase = false,
  label,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: color ?? colors.secondary,
        ...buttonStyles,
      }}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text
        style={{
          ...styles.text,
          textTransform: uppercase ? 'uppercase' : 'none',
          ...textStyles,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 18, color: 'white' },
});

export default Button;
