import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 16) / 2; // 48px padding (24px each side), 16px gap

export default function Wishlist() {
  const router = useRouter();

  // Wishlist items state
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Silk Slip Dress",
      price: 240.00,
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 2,
      name: "Cashmere Knit",
      price: 315.00,
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 3,
      name: "Leather Tote",
      price: 580.00,
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 4,
      name: "Gold Hoops",
      price: 110.00,
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 5,
      name: "Velvet Flats",
      price: 185.00,
      image: require("../../assets/images/product.jpg"),
    },
    {
      id: 6,
      name: "Wool Trousers",
      price: 295.00,
      image: require("../../assets/images/product.jpg"),
    },
  ]);

  const removeItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addAllToCart = () => {
    // Handle adding all items to cart
    console.log("Adding all to cart:", wishlistItems);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <SafeAreaView className="bg-white">
        <View className="flex-row items-center justify-between px-5 py-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full"
          >
            <Ionicons name="chevron-back" size={22} color="#333" />
          </TouchableOpacity>
          
          <Text className="text-xl font-medium tracking-tight text-gray-900">
            Wishlist
          </Text>
          
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
            <Ionicons name="share-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Product Count */}
      <View className="px-6 pt-2 pb-4">
        <Text className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
          {wishlistItems.length} Saved Items
        </Text>
      </View>

      {/* Wishlist Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {wishlistItems.map((item) => (
            <View key={item.id} style={{ width: CARD_WIDTH, marginBottom: 32 }}>
              <View className="flex-col">
                {/* Product Image */}
                <View className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    source={item.image}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  
                  {/* Remove Button */}
                  <TouchableOpacity 
                    onPress={() => removeItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 items-center justify-center rounded-full bg-white/90"
                  >
                    <Ionicons name="close" size={16} color="#333" />
                  </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View className="mt-2">
                  <Text className="text-base font-medium text-gray-800" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add All to Cart Button */}
        <View className="mt-8 mb-4">
          <TouchableOpacity 
            onPress={addAllToCart}
            className="w-full flex-row items-center justify-center gap-2 h-14 bg-black rounded-lg"
            activeOpacity={0.8}
          >
            <Ionicons name="bag-outline" size={20} color="#fff" />
            <Text className="text-white font-semibold tracking-wide">
              Add All to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}