import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {BLACK, GREY1, PRIMARY, TERTIERY, WHITE} from 'styles/colors';
import Logo from 'assets/images/logo.svg';
import IconCamera from 'assets/images/ic_camera.svg';
import {Button, Input} from 'components';
import {TextBold} from 'styles/text-styles';
import IconDown from 'assets/images/ic_chevron_down.svg';
import IconScan from 'assets/images/ic_scan.svg';
import IconPlus from 'assets/images/ic_plus.svg';
import IconMinus from 'assets/images/ic_minus.svg';
import IconCalendar from 'assets/images/ic_calendar.svg';

const Expense = () => {
  const [sumber, setSumber] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Logo />
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Pilih Kategori</TextBold>
            <Input
              placeholder="Pilih Kategori"
              placeholderTextColor={GREY1}
              value=""
              onChangeText={() => {}}
              iconRight={<IconDown />}
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
          </View>
          <View style={styles.section}>
            <View style={[styles.merchant, styles.mb8]}>
              <TextBold>Merchant</TextBold>
              <Pressable style={styles.merchant}>
                <IconScan />
                <TextBold style={{color: TERTIERY}}>Scan Receipt</TextBold>
              </Pressable>
            </View>
            <Input
              placeholder="Ketik Merchant"
              placeholderTextColor={GREY1}
              value=""
              onChangeText={() => {}}
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
          </View>
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Sumber Pengeluaran</TextBold>
            <Input
              placeholder="Pilih Sumber Pengeluaran"
              placeholderTextColor={GREY1}
              value=""
              onChangeText={() => {}}
              iconRight={<IconDown />}
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
          </View>
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Sumber Pengeluaran</TextBold>
            <Input
              placeholder="IDR 0"
              placeholderTextColor={GREY1}
              value={sumber}
              onChangeText={text => setSumber(text)}
              iconRight={<IconPlus />}
              iconLeft={<IconMinus />}
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
              inputStyle={{textAlign: 'center'}}
            />
          </View>
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Tanggal</TextBold>
            <Input
              placeholder="01 Januari 1990"
              placeholderTextColor={GREY1}
              value={sumber}
              onChangeText={text => setSumber(text)}
              iconRight={<IconCalendar />}
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.btnCamera}>
          <IconCamera />
        </Pressable>
        <Button
          text="Tambah"
          borderRadius={10}
          buttonStyle={styles.btnPlus}
          backgroundColor={GREY1}
          textColor={BLACK}
        />
      </View>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 8,
  },
  body: {
    flex: 1,
    paddingVertical: 12,
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignitems: 'center',
  },
  section: {
    marginBottom: 12,
  },
  btnCamera: {
    padding: 20,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPlus: {
    flex: 1,
    marginLeft: 15,
  },
  merchant: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mb8: {
    marginBottom: 8,
  },
});
