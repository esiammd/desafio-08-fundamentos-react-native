/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContextData {
  products: Product[];
  loading: boolean;
  addToCart: (item: Omit<Product, 'quantity'>) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextData | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductsData(): Promise<void> {
      const storageProducts = await AsyncStorage.getItem(
        '@GoMarketplace:products'
      );

      if (storageProducts) {
        setProducts(JSON.parse(storageProducts))
      }

      setLoading(false);
    }

    loadProductsData();
  }, []);

  const addToCart = useCallback(async (product: Omit<Product, 'quantity'>) => {
    const productExists = products.find(item => item.id === product.id);
    let updateProducts = products;

    if (productExists) {
      updateProducts = products.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updateProducts = [ ...products, { ...product, quantity: 1 }];
    }

    setProducts(updateProducts);
    await AsyncStorage.setItem(
      '@GoMarketplace:products',
      JSON.stringify(updateProducts)
    );
  }, [products]);

  const increment = useCallback(async (id: string) => {
    const updateProducts = products.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setProducts(updateProducts);
    await AsyncStorage.setItem(
      '@GoMarketplace:products',
      JSON.stringify(updateProducts)
    );
  }, [products]);

  const decrement = useCallback(async (id: string) => {
    const productExists = products.find(item => item.id === id);
    let updateProducts = products;

    if (productExists && (productExists.quantity - 1 === 0)) {
      const indexOfId = products.indexOf(productExists);
      updateProducts = products.splice(indexOfId, 1);
    }

    updateProducts = products.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
    );

    setProducts(updateProducts);
    await AsyncStorage.setItem(
      '@GoMarketplace:products',
      JSON.stringify(updateProducts)
    );
  }, [products]);

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products, loading }),
    [products, loading, addToCart, increment, decrement],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}
