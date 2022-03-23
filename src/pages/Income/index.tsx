import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BLACK, BLUE, GREY1, PRIMARY, TERTIERY, WHITE} from 'styles/colors';
import Logo from 'assets/images/logo.svg';
import IconCamera from 'assets/images/ic_camera.svg';
import {Button, Input} from 'components';
import {TextBold, TextMedium} from 'styles/text-styles';
import IconDown from 'assets/images/ic_chevron_down.svg';
import IconScan from 'assets/images/ic_scan.svg';
import IconPlus from 'assets/images/ic_plus.svg';
import IconMinus from 'assets/images/ic_minus.svg';
import IconCalendar from 'assets/images/ic_calendar.svg';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {CategorySheet, SourceExpenseSheet, DateSheet} from 'layouts';
import {category, sources} from 'services/constants';
import moment from 'moment';
import * as Progress from 'react-native-progress';

interface CategoryProps {
  id: string;
  name: string;
  color: string;
  isChecked: boolean;
}

const {width} = Dimensions.get('window');

const Income = () => {
  const [sumber, setSumber] = useState('');

  const [categoryList, setCategoryList] = useState(category);
  const [sourceList, setSourceList] = useState(sources);

  const [selectedCategory, setSelectedCategory] = useState<any>({
    id: 1,
    name: '',
    color: '',
  });

  const [selectedSource, setSelectedSource] = useState({
    id: '',
    name: '',
    icon: '',
    isChecked: false,
  });

  const [valueExpense, setValueExpense] = useState<any>('');
  const [selectedDate, setSelectedDate] = useState('');

  const _onPlusValueExp = () => {
    setValueExpense(valueExpense + 10000);
  };

  const _onMinusValueExp = () => {
    if (valueExpense <= 10000) {
      setValueExpense(0);
    }
    if (valueExpense > 10000) {
      setValueExpense(valueExpense - 10000);
    }
  };

  const _onChangeValue = (value: any) => {
    const strToInt = parseInt(value, 10);
    setValueExpense(strToInt);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Logo style={styles.mb8} />
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Pilih Kategori</TextBold>
            <Input
              placeholder="Pilih Kategori"
              placeholderTextColor={GREY1}
              value={selectedCategory.name}
              onChangeText={() => {}}
              editable={false}
              iconLeft={
                <>
                  {selectedCategory.color !== '' && (
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: selectedCategory.color},
                      ]}
                    />
                  )}
                </>
              }
              iconRight={
                <IconDown onPress={() => SheetManager.show('category')} />
              }
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
            <CategorySheet
              id="category"
              data={categoryList}
              onSelected={item => setSelectedCategory(item)}
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
              value={selectedSource.name}
              onChangeText={() => {}}
              iconLeft={
                <>
                  {selectedSource.name !== '' && (
                    <Image source={selectedSource.icon} style={styles.icon} />
                  )}
                </>
              }
              iconRight={
                <IconDown onPress={() => SheetManager.show('sources')} />
              }
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
            <SourceExpenseSheet
              id="sources"
              data={sourceList}
              onSelected={item => setSelectedSource(item)}
            />
          </View>
          <View style={styles.section}>
            <TextBold style={styles.mb8}>Jumlah Pengeluaran</TextBold>
            <Input
              placeholder="Rp 0"
              placeholderTextColor={GREY1}
              value={valueExpense.toString()}
              keyboardType="numeric"
              onChangeText={text => _onChangeValue(text)}
              iconRight={<IconPlus onPress={_onPlusValueExp} />}
              iconLeft={<IconMinus onPress={_onMinusValueExp} />}
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
              value={selectedDate}
              onChangeText={() => {}}
              editable={false}
              iconRight={
                <IconCalendar
                  onPress={() => SheetManager.show('date-sheet-income')}
                />
              }
              backgroundColor={WHITE}
              containerBorderWidth={1}
              containerBorderColor={GREY1}
            />
            <DateSheet
              id="date-sheet-income"
              onSelected={date => setSelectedDate(date)}
            />
          </View>
          {selectedCategory.name !== '' && (
            <View style={styles.section}>
              <TextBold style={styles.mb8}>
                Sisa Budget {selectedCategory.name}
              </TextBold>
              <View style={{alignItems: 'center'}}>
                <Progress.Bar
                  progress={0.72}
                  width={width - 44}
                  height={30}
                  borderRadius={15}
                  borderWidth={0}
                  color={BLUE}
                  useNativeDriver
                  unfilledColor={GREY1}
                />
                <View style={styles.barContainer}>
                  <TextMedium style={{color: WHITE}}>
                    3.250.000 / 4.500.000
                  </TextMedium>
                </View>
              </View>
            </View>
          )}
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

export default Income;

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
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  barContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
