import {Pressable, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {PRIMARY} from 'styles/colors';
import {WHITE} from 'styles/colors';
import {TextBold} from 'styles/text-styles';

interface ButtonProps {
  text: string;
  prefix?: ReactNode;
  postfix?: ReactNode;
  width?: number | string;
  height?: number | string;
  onPress?: () => void;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  buttonStyle?: any;
  textColor?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    text,
    prefix,
    postfix,
    width,
    height,
    onPress,
    backgroundColor,
    borderRadius,
    borderWidth,
    borderColor,
    buttonStyle,
    textColor,
    disabled,
  } = props;
  return (
    <Pressable
      {...props}
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: backgroundColor || PRIMARY,
          borderRadius: borderRadius || 20,
          borderWidth: borderWidth || 0,
          borderColor: borderColor || 'transparent',
        },
        buttonStyle,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {prefix}
      <TextBold style={[styles.text, {color: textColor || WHITE}]}>
        {text}
      </TextBold>
      {postfix}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 18,
  },
});
