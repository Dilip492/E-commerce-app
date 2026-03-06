import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions, FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProduct } from "../../hooks/UseProduct";
const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [productDetailsExpanded, setProductDetailsExpanded] = useState(true);
  const [shippingExpanded, setShippingExpanded] = useState(false);

  const { product, loading } = useProduct(id);

  console.log("product detail", product);


  const colors = [
    { id: "white", value: "#ffffff", border: "#e5e5e5" },
    { id: "black", value: "#000000", border: "#000000" },
    { id: "gray", value: "#6b7280", border: "#6b7280" },
    { id: "dark", value: "#1f2937", border: "#1f2937" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];
  const images = [1, 2, 3, 4]; // Placeholder for multiple images

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Top Navigation Bar */}
      <View className="bg-white">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text className="text-xl font-bold tracking-tight text-black">Product Details</Text>

          <TouchableOpacity onPress={() => { router.replace('/(tabs)/cart') }} className="h-10 w-10 items-center justify-center rounded-full relative">
            <Ionicons name="bag-outline" size={24} color="#000" />
            <View className="absolute top-1 right-1 h-4 w-4 items-center justify-center rounded-full bg-black">
              <Text className="text-[10px] font-bold text-white">2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Image Gallery */}
        <View className="relative w-full aspect-[4/5] bg-gray-100">
          <FlatList
            data={product?.images || []}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setActiveImage(slideIndex);
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: width, height: "100%" }}
                resizeMode="cover"
              />
            )}
          />

          {/* Gallery Indicators */}
          <View className="absolute bottom-6 left-1/2 flex-row -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full ${index === activeImage
                  ? "w-6 bg-black"
                  : "w-1.5 bg-gray-400"
                  }`}
              />
            ))}
          </View>

          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#000" : "#000"}
            />
          </TouchableOpacity>
        </View>

        {/* Product Header */}
        <View className="px-5 pt-6 pb-4">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                Essential Collection
              </Text>
              <Text className="text-2xl font-bold leading-tight text-black">
                {/* Premium Cotton Tee */}
                {product.name}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-bold text-black">₹{product.price}</Text>
              <Text className="text-[10px] text-gray-400 line-through">₹2000.00</Text>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-1 mt-2">
            <View className="flex-row">
              {[1, 2, 3, 4].map((star) => (
                <Ionicons key={star} name="star" size={14} color="#000" />
              ))}
              <Ionicons name="star-half" size={14} color="#000" />
            </View>
            <Text className="text-xs font-medium text-gray-500">(128 reviews)</Text>
          </View>
        </View>

        <View className="h-2 bg-gray-100" />

        {/* Selection Controls */}
        <View className="px-5 py-6 space-y-8">
          {/* Color Selector */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm font-bold uppercase tracking-wider text-black">
                Select Color
              </Text>
              <Text className="text-xs font-medium text-gray-500">
                Optic White
              </Text>
            </View>
            <View className="flex-row gap-4">
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  onPress={() => setSelectedColor(color.id)}
                  className={`h-10 w-10 items-center justify-center rounded-full border-2 ${selectedColor === color.id
                    ? "border-black"
                    : "border-transparent"
                    }`}
                >
                  <View
                    className="h-7 w-7 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.value }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selector */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm font-bold uppercase tracking-wider text-black">
                Select Size
              </Text>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-black underline underline-offset-4">
                  Size Guide
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`h-12 min-w-[3.5rem] items-center justify-center rounded-lg border ${selectedSize === size
                    ? "border-black bg-black"
                    : "border-gray-300"
                    }`}
                >
                  <Text
                    className={`text-sm font-bold ${selectedSize === size ? "text-white" : "text-black"
                      }`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Expandable Sections */}
        <View className="bg-gray-100">
          {/* Product Details */}
          <View className="bg-white border-t border-gray-200">
            <TouchableOpacity
              onPress={() => setProductDetailsExpanded(!productDetailsExpanded)}
              className="flex-row items-center justify-between px-5 py-5"
            >
              <Text className="text-sm font-bold uppercase tracking-wider text-black">
                Product Details
              </Text>
              <Ionicons
                name={productDetailsExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>

            {productDetailsExpanded && (
              <View className="px-5 pb-5">
                <Text className="text-sm leading-relaxed text-gray-600 mb-3">
                  {product.description}
                  {/* Crafted from our signature long-staple Turkish cotton, this tee offers unparalleled softness and durability. Featuring a modern tailored fit that stays true to size after every wash. */}
                </Text>
                <View className="pl-5">
                  {[
                    "100% Organic Pima Cotton",
                    "Pre-shrunk fabric",
                    "Reinforced shoulder seams",
                    "Ethically made in Portugal"
                  ].map((item, index) => (
                    <View key={index} className="flex-row items-start mb-1">
                      <Text className="text-gray-600 mr-2">•</Text>
                      <Text className="text-sm text-gray-600">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Shipping & Returns */}
          <View className="bg-white border-t border-gray-200">
            <TouchableOpacity
              onPress={() => setShippingExpanded(!shippingExpanded)}
              className="flex-row items-center justify-between px-5 py-5"
            >
              <Text className="text-sm font-bold uppercase tracking-wider text-black">
                Shipping & Returns
              </Text>
              <Ionicons
                name={shippingExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#6b7280"
              />
            </TouchableOpacity>

            {shippingExpanded && (
              <View className="px-5 pb-5">
                <Text className="text-sm leading-relaxed text-gray-600">
                  Free standard shipping on orders over $100. Standard delivery typically takes 3-5 business days. We offer a 30-day return policy for unused items in original packaging.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Bottom padding for footer */}
        <View className="h-32" />
      </ScrollView>

      {/* Bottom Sticky Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pt-4 pb-8">
        <View className="flex-row items-center gap-4">
          {/* Quantity Selector */}
          <View className="flex-row h-14 w-32 items-center justify-between rounded-xl bg-gray-100 px-2">
            <TouchableOpacity
              onPress={decreaseQuantity}
              className="h-10 w-10 items-center justify-center"
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>

            <Text className="text-base font-bold text-black">{quantity}</Text>

            <TouchableOpacity
              onPress={increaseQuantity}
              className="h-10 w-10 items-center justify-center"
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={() => { router.push('/(tabs)/cart') }}
            className="flex-1 h-14 items-center justify-center rounded-xl bg-black"
            activeOpacity={0.8}
          >
            <Text className="text-base font-bold text-white">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}