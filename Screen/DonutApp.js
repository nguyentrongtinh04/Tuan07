import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const DonutApp = () => {
  const [products, setProducts] = useState([]);  // Dữ liệu sản phẩm từ API
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Donut'); // Để lưu danh mục đang được chọn
  const [loading, setLoading] = useState(true);  // Để hiển thị trạng thái loading
  const navigation = useNavigation(); // Sử dụng navigation

  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://67020003b52042b542d8f513.mockapi.io/portrait/Donut');  // Thay thế bằng link API của bạn
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm dựa trên danh mục và tìm kiếm
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Donut' || product.name.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.productCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Jala!</Text>
      <Text style={styles.headerText}>Choice your Best food</Text>
      
      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search food"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Category buttons */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Donut' && styles.categoryButtonSelected]}
          onPress={() => setSelectedCategory('Donut')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Donut' && styles.categoryTextSelected]}>
            Donut
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Pink Donut' && styles.categoryButtonSelected]}
          onPress={() => setSelectedCategory('Pink Donut')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Pink Donut' && styles.categoryTextSelected]}>
            Pink Donut
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Floating' && styles.categoryButtonSelected]}
          onPress={() => setSelectedCategory('Floating')}
        >
          <Text style={[styles.categoryText, selectedCategory === 'Floating' && styles.categoryTextSelected]}>
            Floating
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of products */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        style={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#ffcc00', // Đặt màu viền cho giống hình
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10, // Làm cho góc bo tròn
    marginBottom: 20,
    backgroundColor: '#f2f2f2', // Màu nền nhạt hơn
  },
  productList: {
    flex: 1,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fde9e4', // Thay đổi màu nền sản phẩm
    borderRadius: 15, // Tăng bán kính bo góc để giống hình ảnh
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000', // Tạo bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10, // Tăng bo góc cho hình ảnh sản phẩm
    borderWidth: 2, // Thêm đường viền cho hình ảnh sản phẩm
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#ffcc00', // Thay đổi màu nút sang màu vàng
    width: 40,
    height: 40,
    borderRadius: 20, // Tạo nút hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Màu nền nhạt cho nút chưa chọn
  },
  categoryButtonSelected: {
    backgroundColor: '#ffcc00', // Màu nền cho nút được chọn
    borderColor: '#ffcc00',
  },
  categoryText: {
    fontSize: 14,
    color: '#333', // Màu chữ mặc định cho nút chưa chọn
  },
  categoryTextSelected: {
    color: '#fff', // Màu chữ khi nút được chọn
  },
});

export default DonutApp;
