import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Expense, Income} from 'pages';
import {Button} from 'components';
import {BLACK, GREY1, RED, WHITE} from 'styles/colors';

const Tab = createMaterialTopTabNavigator();

const MyTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onLongPress={onLongPress}
            style={styles.tabContainer}>
            <Button
              text={label}
              onPress={onPress}
              buttonStyle={styles.tabStyle}
              backgroundColor={isFocused ? RED : GREY1}
              textColor={isFocused ? WHITE : BLACK}
              borderRadius={10}
              width="90%"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const NavHome = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Expense"
        component={Expense}
        options={{
          tabBarLabel: 'Pengeluaran',
        }}
      />
      <Tab.Screen
        name="Income"
        component={Income}
        options={{
          tabBarLabel: 'Pemasukan',
        }}
      />
    </Tab.Navigator>
  );
};

export default NavHome;

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  tabStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
