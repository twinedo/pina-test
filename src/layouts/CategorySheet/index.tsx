import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextBold} from 'styles/text-styles';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {GREY1} from 'styles/colors';
import IconCheck from 'assets/images/ic_check.svg';

interface CategorySheetProps {
  id: string;
  data: Array<any>;
  onSelected: (item: CategorySheetProps) => void;
}

const CategorySheet = (props: CategorySheetProps) => {
  const {id, data, onSelected} = props;

  const [category, setCategory] = useState(data);

  const _onPress = (item: any, index: number) => {
    let dat = [...category];
    dat[index].isChecked = !dat[index].isChecked;

    const unCheckedFilter = dat.filter((_: any, i) => i !== index);
    unCheckedFilter.forEach((i: any) => (i.isChecked = false));
    const join = [dat[index], ...unCheckedFilter];
    join.sort((a, b) => {
      return a.id - b.id;
    });
    setCategory(join);
    onSelected(item);
    SheetManager.hide(id);
  };

  const renderItem = ({item, index}: any) => (
    <Pressable style={styles.item} onPress={() => _onPress(item, index)}>
      <View style={[styles.dot, {backgroundColor: item.color}]} />
      <View style={styles.txtContainer}>
        <TextBold>{item.name}</TextBold>
      </View>
      {item.isChecked && <IconCheck width={20} height={20} />}
    </Pressable>
  );

  return (
    <ActionSheet id={id}>
      <View style={styles.container}>
        <TextBold>Pilih Kategori</TextBold>
        <FlatList
          data={category}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </ActionSheet>
  );
};

export default CategorySheet;

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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  txtContainer: {
    flex: 1,
    marginLeft: 8,
  },
});
