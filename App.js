import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DonutApp from './Screen/DonutApp'; // File chứa danh sách sản phẩm
import ProductDetailScreen from './Screen/ProductDetailScreen'; // File chi tiết sản phẩm

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DonutApp">
        <Stack.Screen name="DonutApp" component={DonutApp} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
