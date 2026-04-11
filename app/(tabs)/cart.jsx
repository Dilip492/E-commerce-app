import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart, useRemoveCart } from "../../hooks/UseCart";
import { colors } from "../../theme/colors";

export default function CartPage() {

  const router = useRouter();

  const { data } = useCart();
  const { mutate: removeCart } = useRemoveCart();


  const cartItems = data?.items || [];

  console.log("cartdetail", cartItems)



  const [cart, setCart] = useState([
    {
      id: "1",
      title: "Wireless Bluetooth Headphones",
      price: 2499,
      qty: 1,
      image: require("../../assets/images/product.jpg"),
      brand: "AudioTech",
      delivery: "Free Delivery",
    },
    {
      id: "2",
      title: "Smart Watch Series 5",
      price: 3999,
      qty: 2,
      image: require("../../assets/images/product.jpg"),
      brand: "TechWear",
      delivery: "Fast Delivery",
    },
    {
      id: "3",
      title: "USB-C Fast Charger",
      price: 899,
      qty: 1,
      image: { uri: "https://picsum.photos/200/300" },
      brand: "PowerUp",
      delivery: "Free Delivery",
    },
  ]);

  const [orderSummaryModal, setOrderSummaryModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = total > 2000 ? 0 : 99;
  const discount = appliedPromo ? Math.round(total * 0.1) : 0; // 10% discount example
  const grandTotal = total + deliveryCharge - discount;

  const applyPromoCode = () => {
    if (promoCode.trim() === "SAVE10") {
      setAppliedPromo(true);
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(false);
  };

  const renderItem = ({ item }) => (
    <Animated.View
      className="flex-row items-center p-4 mb-3 border-b border-gray-200"
    >
      <View className="relative">
        <Image
          source={{
            uri:
              item.product?.images?.[0]
          }}
          style={{ width: 80, height: 110 }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />
        {item.quantity > 1 && (
          <View className="absolute -top-2 -right-2 bg-primary rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-black text-xs font-bold">{item.quantity}</Text>
          </View>
        )}
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-xs font-medium text-gray-500">
          {item.product?.brand || "Brand"}
        </Text>
        <Text
          className="text-base font-semibold mt-1"
          style={{ color: colors.heading }}
          numberOfLines={2}
        >
          {item.product?.name}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            {/* Quantity Controls */}
            <View className="flex-row items-center  rounded-full">
              <Pressable
                onPress={() => decreaseQty(item.id)}
                className="px-2 py-2 rounded-full"

              >
                <Ionicons name="remove" size={16} color={colors.text} />
              </Pressable>

              <Text className="mx-4 text-base font-semibold" style={{ color: colors.heading }}>
                {item.quantity}
              </Text>

              <Pressable
                onPress={() => increaseQty(item.id)}
                className="px-2 py-2 rounded-full"

              >
                <Ionicons name="add" size={16} color={colors.text} />
              </Pressable>
            </View>

            {/* Item Total */}
            <Text className="ml-4 text-lg font-bold" style={{ color: colors.primary }}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mt-2">
          <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
          <Text className="text-xs text-gray-500 ml-1">{item.delivery}</Text>
          <Text className="text-xs text-gray-500 ml-4">
            ₹{item.price} each
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => removeCart(item.product?._id)}
        className="p-2 rounded-lg ml-2"

      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View className="px-5 pt-4  bg-white border-b border-gray-100">

          <View className="flex-row items-center justify-between  py-3 border-b border-gray-200">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* <Text className="text-base font-bold tracking-tight text-black">Product Details</Text> */}
            <Text
              className="text-xl tracking-tight font-bold flex"
              style={{ color: colors.heading }}
            >
              Shopping Cart

            </Text>


            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full relative">
              {/* <Ionicons name="bag-outline" size={24} color="#000" />
              <View className="absolute top-1 right-1 h-4 w-4 items-center justify-center rounded-full bg-black">
                <Text className="text-[10px] font-bold text-white">2</Text>
              </View> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Cart List */}
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product?._id?.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          contentContainerClassName="p-5"
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <View className="bg-gray-100 p-6 rounded-full mb-4">
                <Ionicons name="cart-outline" size={60} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-semibold text-gray-400 mb-2">
                Your cart is empty
              </Text>
              <Text className="text-gray-400 text-center">
                Add some items to get started
              </Text>
            </View>
          }
        />

        {/* Bottom Checkout Section */}
        {cartItems.length > 0 && (
          <View className="bg-white border-t border-gray-200 pt-4 px-5 pb-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-600">Total</Text>
                <Text className="text-2xl font-bold" style={{ color: colors.primary }}>
                  ₹{total}
                </Text>
              </View>
              <Pressable
                onPress={() => setOrderSummaryModal(true)}
                className="py-3 px-8 rounded-xl shadow-lg"
                style={{
                  backgroundColor: colors.primary,
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Text className="text-white font-bold text-lg">
                  Checkout
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Order Summary Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={orderSummaryModal}
        onRequestClose={() => setOrderSummaryModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={() => setOrderSummaryModal(false)}>
            <View className="flex-1 bg-black/50" />
          </TouchableWithoutFeedback>

          <View className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0 max-h-3/4">
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Modal Header */}
              <View className="pt-6 pb-4 px-5 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-2xl font-bold" style={{ color: colors.heading }}>
                    Order Summary
                  </Text>
                  <Pressable
                    onPress={() => setOrderSummaryModal(false)}
                    className="p-2"
                  >
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                  </Pressable>
                </View>
                <Text className="text-gray-500">
                  Review your order before proceeding to payment
                </Text>
              </View>

              {/* Order Items */}
              <View className="px-5 py-4">
                <Text className="text-lg font-semibold mb-3" style={{ color: colors.heading }}>
                  Items ({cartItems.length})
                </Text>
                {cartItems.map((item) => {
                  console.log("item2", item)
                  return (
                    <View key={item.product?._id} className="flex-row items-center mb-4">
                      <Image
                        source={{ uri: item.product?.images?.[0] }}
                        className="h-14 w-14 rounded-lg mr-3"
                        resizeMode="cover"
                      />
                      <View className="flex-1">
                        <Text className="font-medium" style={{ color: colors.heading }}>
                          {item.product?.name}
                        </Text>
                        <View className="flex-row justify-between items-center mt-1">
                          <Text className="text-gray-500 text-sm">
                            Qty: {item.quantity} × ₹{item.price}
                          </Text>
                          <Text className="font-semibold">
                            ₹{item.price * item.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>

              {/* Price Breakdown */}
              <View className="px-5 py-4 border-t border-gray-200">
                <Text className="text-lg font-semibold mb-4" style={{ color: colors.heading }}>
                  Price Details
                </Text>

                <View className="space-y-3">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Subtotal</Text>
                    <Text className="font-medium">₹{total}</Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Delivery</Text>
                    <Text className={deliveryCharge === 0 ? "text-green-600 font-medium" : "font-medium"}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </Text>
                  </View>

                  {/* Promo Code Section */}
                  {appliedPromo ? (
                    <View className="flex-row justify-between items-center bg-green-50 p-3 rounded-lg">
                      <View className="flex-row items-center">
                        <Ionicons name="checkmark-circle" size={20} color="#059669" />
                        <Text className="text-green-700 font-medium ml-2">
                          Promo Applied (SAVE10)
                        </Text>
                      </View>
                      <Pressable onPress={removePromoCode}>
                        <Text className="text-red-500 font-medium">Remove</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <View className="mt-2">
                      <Text className="text-gray-600 mb-2">Add promo code</Text>
                      <View className="flex-row items-center">
                        <TextInput
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg"
                          placeholder="Enter promo code"
                          placeholderTextColor="#9CA3AF"
                          value={promoCode}
                          onChangeText={setPromoCode}
                          onSubmitEditing={applyPromoCode}
                        />
                        <Pressable
                          onPress={applyPromoCode}
                          className="bg-gray-800 px-4 py-3 rounded-r-lg"
                        >
                          <Text className="text-white font-semibold">Apply</Text>
                        </Pressable>
                      </View>
                      <Text className="text-xs text-gray-500 mt-2">
                        Try "SAVE10" for 10% off
                      </Text>
                    </View>
                  )}

                  {discount > 0 && (
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Discount</Text>
                      <Text className="text-green-600 font-medium">-₹{discount}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Total Amount */}
              <View className="px-5 py-4 border-t border-gray-200 bg-gray-50">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-lg font-bold" style={{ color: colors.heading }}>
                      Total Amount
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      Inclusive of all taxes
                    </Text>
                  </View>
                  <Text className="text-2xl font-bold" style={{ color: colors.primary }}>
                    ₹{grandTotal}
                  </Text>
                </View>
              </View>

              {/* Payment Button */}
              <View className="px-5 py-4 border-t border-gray-200">
                <Pressable
                  className="py-4 rounded-xl items-center"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                  onPress={() => {
                    // Handle payment logic here
                    console.log("Proceed to payment");
                    router.replace('/checkout')
                  }}
                >
                  <Text className="text-white font-bold text-lg">
                    Proceed to Checkout
                  </Text>
                  <Text className="text-white/90 text-sm mt-1">
                    ₹{grandTotal} • Secure Payment
                  </Text>
                </Pressable>

                {/* Security Badge */}
                <View className="flex-row items-center justify-center mt-4">
                  <Ionicons name="shield-checkmark" size={16} color="#059669" />
                  <Text className="text-gray-500 text-sm ml-2">
                    100% Secure • SSL Encrypted
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}