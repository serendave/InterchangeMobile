import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';

type ButtonProps = {
  label: string;
  color?: string;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({ label, color, onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: color ?? colors.secondary }}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
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
  text: { fontSize: 18, color: 'white', textTransform: 'uppercase' },
});

export default Button;
