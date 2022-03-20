import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {GREY2, WHITE} from 'styles/colors';
import {Toolbar} from 'components';
import IonIcons from 'react-native-vector-icons/Ionicons';
import NavHome from 'routes/NavHome';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      <Toolbar
        text="Buat Transaksi"
        prefix={<IonIcons name="chevron-back" size={24} color={GREY2} />}
      />
      <NavHome />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 12,
  },
});
