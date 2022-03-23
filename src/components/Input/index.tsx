import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {BLACK, GREY1, GREY2} from 'styles/colors';

interface InputProp {
  iconLeft?: React.ReactNode;
  iconRight?: boolean | React.ReactNode;
  props?: TextInputProps;
  placeholder?: string;
  placeholderTextColor?: typeof GREY2 | string;
  value: any;
  onChangeText: (event: string) => void;
  backgroundColor?: string;
  containerBorderWidth?: number;
  containerBorderColor?: string;
  inputStyle?: any;
}

const Input: FC<InputProp> = props => {
  const {
    iconLeft,
    iconRight,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    backgroundColor,
    containerBorderWidth,
    containerBorderColor,
    inputStyle,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || GREY1,
          borderWidth: containerBorderWidth || 0,
          borderColor: containerBorderColor || 'transparent',
        },
      ]}>
      {iconLeft}

      <TextInput
        {...props}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />

      {iconRight}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: GREY1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: BLACK,
  },
});

Input.propTypes = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.any,
};
