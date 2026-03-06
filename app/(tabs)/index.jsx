import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  // Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { useProducts } from "../../hooks/UseProducts";
import { colors } from "../../theme/colors";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("puma");

  const { product, loading } = useProducts();
  // console.log(product)
  useEffect(() => {
    if (product && product.length > 0) {
      product.forEach((item) => {
        if (item.images && item.images.length > 0) {
          Image.prefetch(item.images[0]);
        }
      });
    }
  }, [product]);

  const router = useRouter();

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };
  const categories = ["All", "Apparel", "Accessories"];

  const brands = [
    { name: "Nike", icon: require('../../assets/images/nike.png') },
    { name: "Puma", icon: require('../../assets/images/puma.png') },
    { name: "Gucci", icon: require('../../assets/images/gucci.png') },
    { name: "Reebok", icon: require('../../assets/images/rebook.png') },
    // { name: "Adidas", icon: require('../../assets/images/addidas.png') },
  ];

  const products = [
    {
      id: 1,
      name: "Structured Wool Coat",
      price: "₹285.00",
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 2,
      name: "Cashmere Silk Scarf",
      price: "₹120.00",
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 3,
      name: "Minimalist Heel",
      price: "₹180.00",
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 4,
      name: "Cotton Poplin Shirt",
      price: "₹95.00",
      image: require("../../assets/images/product.jpg"),
    },
  ];

  // Navigate to product detail
  const handleProductPress = (product) => {
    router.push({
      pathname: `/(product)/${product._id}`,
      params: {
        id: product._id,
        name: product.name,
        price: product.price,
        // You can pass more params if needed
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Text className="text-2xl font-semibold tracking-tight">Elysian</Text>
          <View className="flex-row gap-4">
            <Ionicons name="notifications-outline" size={22} color="#333" />
            <Ionicons name="bag-outline" size={22} color="#333" />
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-4 pb-2">
          <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-1 ">
            <Ionicons name="search-outline" size={18} color="#777" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              className="ml-2 flex-1 text-base"
            />
          </View>
        </View>

        {/* Banner */}
        <View className="mx-5 mt-2 rounded-2xl overflow-hidden relative">
          <Image
            source={require("../../assets/images/banner-1.webp")}
            style={{ width: "100%", height: 180 }}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
          />
          {/* <View className="absolute left-5 top-8">
            <Text className="text-white text-xs tracking-widest font-medium">
              SEASONAL DROP
            </Text>
            <Text className="text-white text-3xl font-semibold mt-1 leading-tight">
              New Arrivals
            </Text>
            <TouchableOpacity className="bg-white rounded-full px-5 py-2 mt-3 self-start">
              <Text className="font-semibold text-gray-900">Shop Collection</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* Categories */}
        {/* <View className="flex-row px-5 mt-6">
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setActiveCategory(item)}
              className="mr-6"
            >
              <Text
                className={`text-base ₹{
                  activeCategory === item
                    ? "text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                {item}
              </Text>
              {activeCategory === item && (
                <View className="h-0.5 w-full bg-black mt-1" />
              )}
            </TouchableOpacity>
          ))}
        </View> */}



        <View className="mt-8 px-4">
          <View className="flex-row justify-between items-center mb-4 px-2">
            <Text className="text-xl font-bold" style={{ color: colors.heading }}>Popular Brands</Text>
            <TouchableOpacity onPress={() => router.push('/Categories')}>
              <Text className="text-sm font-semibold  rounded-full" style={{ color: colors.primary }}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {brands.map((brand) => (
              <Pressable
                key={brand.name}
                onPress={() => setActiveBrand(brand.name.toLowerCase())}
                className="items-center mr-8"
              >
                <View className={`h-20 w-20 rounded-full items-center justify-center shadow-sm 
                ${activeBrand === brand.name.toLowerCase() ? 'bg-black' : 'bg-gray-50 border border-gray-100 rounded-full'}`}
                >
                  <Image
                    source={brand.icon}
                    style={{ tintColor: activeBrand === brand.name.toLowerCase() ? "#fff" : "#333", width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className={`text-sm mt-2 font-medium ${activeBrand === brand.name.toLowerCase() ? 'text-black font-semibold' : 'text-gray-600'}`}>
                  {brand.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

        </View>

        {/* Featured Pieces Header */}
        <View className="flex-row items-center justify-between px-5 mt-6">
          <Text className="text-xl font-semibold">Featured Pieces</Text>
          <TouchableOpacity>
            <Text className="text-gray-400 text-sm">View All</Text>
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View className="flex-row flex-wrap justify-between px-4 mt-4">
          {product.map((item) => (
            <TouchableOpacity key={item._id} className="w-[48%] mb-5" onPress={() => handleProductPress(item)}
              activeOpacity={0.7}>
              {/* Product Image with Heart Icon */}
              <View className="relative">
                <Image
                  source={item.images?.length ? item.images[0] : require("../../assets/images/product.jpg")}
                  style={{ width: "100%", height: 256, borderRadius: 12 }}
                  contentFit="cover"
                  transition={300}
                  cachePolicy="memory-disk"
                />
                {/* Heart Button - THIS WORKS! */}
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  className="absolute right-2 top-2 bg-white p-2 rounded-full shadow-sm"
                  style={{ elevation: 2 }} // Small shadow for Android
                >
                  <Ionicons
                    name={favorites[item.id] ? "heart" : "heart-outline"}
                    size={16}
                    color={favorites[item.id] ? "#ff4444" : "#333"}
                  />
                </TouchableOpacity>

              </View>

              {/* Product Info */}
              <View className="mt-2 px-3">
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="font-semibold text-gray-900 mt-0.5">
                  ₹ {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra bottom padding */}
        <View className="h-5" />
      </ScrollView>
    </SafeAreaView>
  );
}

const renderProduct = ({ item }) => (
  <TouchableOpacity
    key={item._id}
    className="w-[48%] mb-5"
    onPress={() => handleProductPress(item)}
    activeOpacity={0.7}
  >
    <View className="relative">
      <Image
        source={
          item.images?.length
            ? { uri: item.images[0] }
            : require("../../assets/images/product.jpg")
        }
        className="w-full h-64 rounded-xl"
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() => toggleFavorite(item._id)}
        className="absolute right-2 top-2 bg-white p-2 rounded-full shadow-sm"
        style={{ elevation: 2 }}
      >
        <Ionicons
          name={favorites[item._id] ? "heart" : "heart-outline"}
          size={16}
          color={favorites[item._id] ? "#ff4444" : "#333"}
        />
      </TouchableOpacity>
    </View>

    <View className="mt-2 px-3">
      <Text className="text-sm text-gray-600" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="font-semibold text-gray-900 mt-0.5">
        ₹ {item.price}
      </Text>
    </View>
  </TouchableOpacity>
);