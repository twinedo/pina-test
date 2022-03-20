import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WHITE} from 'styles/colors';
import Logo from 'assets/images/logo.svg';
import {TextBold} from 'styles/text-styles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      <Logo width={150} height={150} />
      <TextBold style={styles.title}>PINA</TextBold>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});
