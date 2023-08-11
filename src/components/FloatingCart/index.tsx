import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

interface FloatingCartProps {
  isButton?: boolean;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ isButton = true }) => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const initialValue = 0;
    const totalValue = products.reduce((accumulator, item) => {
      const productSubtotal = item.price * item.quantity;

      return accumulator + productSubtotal;
    }, initialValue);

    return formatValue(totalValue);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const initialValue = 0;
    const totalItens = products.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, initialValue);

    return totalItens;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart' as never)}
        disabled={!isButton}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
