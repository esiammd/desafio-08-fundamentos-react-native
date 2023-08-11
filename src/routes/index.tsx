import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AppRoutes from './app.routes';

import { useCart } from '../hooks/cart';

const Routes: React.FC = () => {
  const { loading } = useCart();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='#999999' />
      </View>
    )
  }

  return <AppRoutes />;
};

export default Routes;
