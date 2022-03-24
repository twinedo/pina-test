import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, SplashScreen, Transaction} from 'pages';

export type RoutesParam = {
  SplashScreen: undefined;
  Home: undefined;
  Transaction: undefined;
};

const Stack = createStackNavigator<RoutesParam>();

const Routes = () => {
  const {Navigator, Screen, Group} = Stack;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {isLoading ? (
        <Screen name="SplashScreen" component={SplashScreen} />
      ) : (
        <Group>
          <Screen name="Home" component={Home} />
          <Screen name="Transaction" component={Transaction} />
        </Group>
      )}
    </Navigator>
  );
};

export default Routes;
