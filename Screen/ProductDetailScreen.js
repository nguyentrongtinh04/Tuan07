import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon cho giỏ hàng

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1); // Trạng thái cho số lượng sản phẩm

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Hàm để giảm số lượng nhưng không giảm dưới 1
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />

      {/* Thông tin sản phẩm */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>

      {/* Thông tin giao hàng */}
      <View style={styles.deliveryContainer}>
        <Ionicons name="time-outline" size={20} color="gray" />
        <Text style={styles.deliveryText}>Delivery in</Text>
        <Text style={styles.deliveryTime}>30 min</Text>
      </View>

      {/* Số lượng sản phẩm */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
          <Ionicons name="remove" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
          <Ionicons name="add" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Thông tin nhà hàng */}
      <Text style={styles.restaurantInfo}>
        Order a Large Pizza but the size is the equivalent of a medium/small from other places at the same price range.
      </Text>

      {/* Nút thêm vào giỏ hàng */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.goBack()}>
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
