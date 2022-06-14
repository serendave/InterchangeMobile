import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/src/components/Dropdown/model';
import { colors } from '../../styles';

const Dropdown: FC<DropdownProps> = ({
  style,
  placeholderStyle,
  selectedTextStyle,
  ...rest
}) => {
  return (
    <RNDropdown
      style={{ ...styles.category, ...(style as object) }}
      placeholderStyle={{
        ...styles.categoryPlaceholder,
        ...(placeholderStyle as object),
      }}
      selectedTextStyle={{
        ...styles.categorySelectedText,
        ...(selectedTextStyle as object),
      }}
      {...rest}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  category: {
    backgroundColor: colors.white,
    flex: 1,
    borderColor: colors.border,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  categoryPlaceholder: {
    fontSize: 14,
    color: colors.gray,
  },
  categorySelectedText: {
    fontSize: 14,
  },
});
