import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, SplashScreen} from 'pages';

export type RoutesParam = {
  SplashScreen: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RoutesParam>();

const Routes = () => {
  const {Navigator, Screen} = Stack;

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
        <Screen name="Home" component={Home} />
      )}
    </Navigator>
  );
};

export default Routes;
