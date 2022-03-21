import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {GREY1} from 'styles/colors';
import IconCheck from 'assets/images/ic_check.svg';
import {TextBold} from 'styles/text-styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface SourceExpenseProps {
  id: string | number;
  name: string;
  icon: string;
  isChecked: boolean;
}

interface SourceExpenseSheetProps {
  id: string;
  data: Array<SourceExpenseProps>;
  onSelected: (item: SourceExpenseSheetProps) => void;
}

const SourceExpenseSheet = (props: SourceExpenseSheetProps) => {
  const {id, data, onSelected} = props;

  const [source, setSource] = useState(data);

  useEffect(() => {
    setSource(data);
  }, [data]);

  const bankList = [
    {
      id: 1,
      name: 'BCA',
      number: '1234567890',
      icon: require('assets/images/ic_bca.png'),
    },
    {
      id: 2,
      name: 'BNI',
      number: '1234567890',
      icon: require('assets/images/ic_bni.png'),
    },
  ];

  const _onPress = (item: SourceExpenseProps, index: number) => {
    let dat = [...source];
    dat[index].isChecked = !dat[index].isChecked;

    const unCheckedFilter = dat.filter((_: any, i) => i !== index);
    unCheckedFilter.forEach((i: any) => (i.isChecked = false));
    const join = [dat[index], ...unCheckedFilter];
    join.sort((a, b) => {
      return a.id - b.id;
    });
    setSource(join);
    onSelected(item);
    SheetManager.hide(id);
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <Pressable
          style={styles.item}
          onPress={() => {
            item.id !== 2 && _onPress(item, index);
          }}>
          <Image source={item.icon} style={styles.icon} />
          <View style={styles.txtContainer}>
            <TextBold>{item.name}</TextBold>
          </View>
          {item.isChecked && <IconCheck width={20} height={20} />}
        </Pressable>
        {item.id === 2 &&
          bankList.map(v => (
            <Pressable
              style={styles.bankRef}
              onPress={() => _onPress(item + v, index)}
              key={v.id}>
              <Image source={v.icon} style={styles.icon} />
              <TextBold style={{marginLeft: 10}}>
                {v.name} {v.number}
              </TextBold>
            </Pressable>
          ))}
      </>
    );
  };

  return (
    <ActionSheet id={id}>
      <View style={styles.container}>
        <TextBold>Pilih Kategori</TextBold>
        <FlatList
          data={source}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </ActionSheet>
  );
};

export default SourceExpenseSheet;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GREY1,
  },
  txtContainer: {
    flex: 1,
    marginLeft: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  bankRef: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
