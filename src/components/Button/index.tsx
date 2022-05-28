import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';

type ButtonProps = {
  label: string;
  color?: string;
  additionalStyles?: Record<string, any>;
  uppercase?: boolean;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({
  additionalStyles,
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
        ...additionalStyles,
      }}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text
        style={{
          ...styles.text,
          textTransform: uppercase ? 'uppercase' : 'none',
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
