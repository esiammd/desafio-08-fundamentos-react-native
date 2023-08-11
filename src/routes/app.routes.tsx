import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: '#ebeef8' },
      }}
      initialRouteName="Dashboard"
    >
      <App.Screen
        options={{
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: () => <Image source={Logo} />,
        }}
        name='Dashboard'
        component={Dashboard}
      />
      <App.Screen
        options={{
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: () => <Image source={Logo} />,
        }}
        name="Cart"
        component={Cart}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
