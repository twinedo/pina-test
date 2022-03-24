import {
  Pressable,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {transactions} from 'services/constants';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Input, Toolbar} from 'components';
import {
  BLACK,
  GREY2,
  PRIMARY,
  SECONDARY,
  TOURQUISE,
  WHITE,
} from 'styles/colors';
import IconSort from 'assets/images/ic_sort.svg';
import IconFilter from 'assets/images/ic_filter.svg';
import {TextBold} from 'styles/text-styles';
import IconCheck from 'assets/images/ic_check.svg';

const Transaction = () => {
  const [trans, setTrans] = useState(transactions);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    _addItemChecked();
  }, []);

  const _addItemChecked = () => {
    const dat = [...trans];
    const newArr = dat.map(item => {
      return {
        ...item,
        data: item.data.map(o => {
          return {...o, isChecked: false};
        }),
      };
    });
    setTrans(newArr);
  };

  const _onPressData = (data: any, index: number) => {
    let dat = [...trans];

    const findIndexParent = dat.findIndex(o => o.data[index] === data);

    dat[findIndexParent].data[index].isChecked =
      !dat[findIndexParent].data[index].isChecked;
    const unCheckedFilter = dat[findIndexParent].data.filter(
      (_: any, i) => i !== index,
    );
    unCheckedFilter.forEach(i => (i.isChecked = false));
    const join = [dat[findIndexParent].data[index], ...unCheckedFilter];
    console.log(join);
    join.sort((a, b) => {
      return a.id - b.id;
    });
    dat[findIndexParent].data = join;

    const unCheckedParentFilter = dat.filter(o => o.data !== join);
    unCheckedParentFilter.forEach(i =>
      i.data.forEach(o => (o.isChecked = false)),
    );
    const joinParent = [dat[findIndexParent], ...unCheckedParentFilter];
    joinParent.sort((a, b) => {
      return a.id - b.id;
    });
    console.log('joinParent', joinParent);
    setTrans(joinParent);
    setTimeout(() => {
      route?.params?._onCallback(dat[findIndexParent]);
    }, 1000);
    navigation.goBack();
  };

  const Item = ({data, index}: any) => {
    return (
      <View style={[styles.flexRow, {marginVertical: 5}]}>
        <View style={{flex: 1}}>
          <TextBold style={{color: BLACK}}>{data.detail}</TextBold>
          <TextBold style={{color: GREY2}}>
            {data.bank + ' - ' + data.number}
          </TextBold>
        </View>
        <Pressable
          style={[styles.flexRow, {flex: 1, justifyContent: 'flex-end'}]}
          onPress={() => {
            _onPressData(data, index);
          }}>
          <TextBold style={{color: SECONDARY, marginRight: 5}}>
            {data.amount}
          </TextBold>
          {data.isChecked && <IconCheck width={20} height={20} />}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      <Toolbar
        text="Pilih Transaksi"
        prefix={<IonIcons name="chevron-back" size={24} color={GREY2} />}
      />
      <View style={styles.header}>
        <View style={{flex: 2}}>
          <Input
            type="text"
            placeholder="Search"
            iconRight={<IonIcons name="search" size={24} color={BLACK} />}
            backgroundColor={WHITE}
            containerBorderWidth={1}
            containerBorderColor={TOURQUISE}
          />
        </View>
        <View style={styles.headerToolsContainer}>
          <Pressable style={styles.headerTools}>
            <IconSort />
          </Pressable>
          <Pressable style={styles.headerTools}>
            <IconFilter />
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1}}>
        <SectionList
          sections={trans}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => <Item data={item} index={index} />}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeaderList}>
              <TextBold>{section.date}</TextBold>
              <TextBold>{section.summary}</TextBold>
            </View>
          )}
        />
      </View>
      <Pressable
        onPress={() => {
          route?.params?._onCallback('Test');
          navigation.goBack();
        }}>
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerToolsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerTools: {
    borderWidth: 1,
    borderColor: TOURQUISE,
    borderRadius: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderList: {
    backgroundColor: TOURQUISE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
