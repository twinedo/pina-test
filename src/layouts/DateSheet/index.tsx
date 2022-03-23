import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {TextBold} from 'styles/text-styles';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import {Months, years} from 'services/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {BLACK, PRIMARY, TERTIERY, WHITE} from 'styles/colors';
import {Calendar, CalendarProps} from 'react-native-calendars';
import moment from 'moment';
import {Button} from 'components';

interface DateSheetProps {
  id: string;
  onSelected?: (item: any) => void;
}

const DateSheet = (props: DateSheetProps) => {
  const {id, onSelected} = props;
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));

  const [selectedMonthYear, setSelectedMonthYear] = useState({
    day: moment().date(),
    month: moment().month(),
    year: moment().year(),
  });

  const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
    setSelected(day.dateString);
    setSelectedMonthYear({...selectedMonthYear, day: day.day});
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: TERTIERY,
        selectedTextColor: WHITE,
      },
    };
  }, [selected]);

  const _onSelectMonth = (month: any) => {
    let addDay = '';
    if (selectedMonthYear.day < 10) {
      addDay = '0' + selectedMonthYear.day.toString();
    } else {
      addDay = selectedMonthYear.day.toString();
    }
    const formatDate =
      selectedMonthYear.year + '-' + month.format + '-' + addDay;

    setSelectedMonthYear({...selectedMonthYear, month: month.format});
    setSelected(formatDate);
  };

  const _onSelectYear = (year: number): void => {
    let addDay = '';
    if (selectedMonthYear.day < 10) {
      addDay = '0' + selectedMonthYear.day.toString();
    } else {
      addDay = selectedMonthYear.day.toString();
    }
    const formatYear = year + '-' + selectedMonthYear.month + '-' + addDay;
    setSelectedMonthYear({...selectedMonthYear, year});
    setSelected(formatYear);
  };

  const _onPressSeleced = () => {
    onSelected?.(moment(selected).format('DD MMMM YYYY'));
    SheetManager.hide(id);
  };

  return (
    <ActionSheet id={id}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextBold>Pilih Tanggal</TextBold>
          <View style={styles.header}>
            <SelectDropdown
              data={Months}
              onSelect={selectedItem => _onSelectMonth(selectedItem)}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.name;
              }}
              rowTextForSelection={item => {
                return item.name;
              }}
              buttonStyle={styles.btnDropdown}
              defaultButtonText={moment(selected).format('MMM')}
              renderDropdownIcon={() => {
                return <IonIcons name="chevron-down" size={24} color={BLACK} />;
              }}
            />
            <SelectDropdown
              data={years}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                _onSelectYear(selectedItem);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              rowTextForSelection={item => {
                return item;
              }}
              buttonStyle={styles.btnDropdown}
              defaultButtonText={moment(selected).format('YYYY')}
              renderDropdownIcon={() => {
                return <IonIcons name="chevron-down" size={24} color={BLACK} />;
              }}
            />
          </View>
        </View>
        <Calendar
          enableSwipeMonths={false}
          current={selected}
          key={selected}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
          hideArrows={true}
          renderHeader={() => null}
        />
        <Button
          text="Pilih"
          textColor={BLACK}
          backgroundColor={PRIMARY}
          height={40}
          borderRadius={10}
          onPress={_onPressSeleced}
        />
      </View>
    </ActionSheet>
  );
};

export default DateSheet;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnDropdown: {
    backgroundColor: WHITE,
    width: 100,
  },
  calendar: {
    marginBottom: 10,
  },
});
