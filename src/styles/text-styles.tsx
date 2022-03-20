import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {BLACK} from 'styles/colors';

interface TextCustomProps {
  style?: TextStyle | TextStyle[];
  children?: any;
  props?: TextProps;
}

const TextMedium = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textMedium, props.style]}>
      {props.children}
    </Text>
  );
};

const TextItalic = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textItalic, props.style]}>
      {props.children}
    </Text>
  );
};

const TextBold = (props: TextCustomProps) => {
  return (
    <Text {...props} style={[styles.textBold, props.style]}>
      {props.children}
    </Text>
  );
};

export {TextMedium, TextItalic, TextBold};

const styles = StyleSheet.create({
  textMedium: {
    fontFamily: 'Gotham-Rounded-Medium',
    color: BLACK,
  },
  textBold: {
    fontFamily: 'Gotham-Rounded-Bold',
    color: BLACK,
  },
  textItalic: {
    fontFamily: 'Gotham-Rounded-Medium',
    color: BLACK,
    fontStyle: 'italic',
  },
});
