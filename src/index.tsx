import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.1)' />

      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#ebeef8' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
