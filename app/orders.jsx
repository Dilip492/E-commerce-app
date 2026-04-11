import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">

            {/* Header */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderColor: "#eee"
            }}>
                <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="#000" />
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Orders</Text>
                <Ionicons onPress={() => router.push('/profile')} name="settings-outline" size={24} color="#000" />
            </View>

            <ScrollView className="px-4 mt-4">

                {/* Filter Buttons */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="bg-black px-4 py-2 rounded-full">
                            <Text className="text-white text-sm">All Orders</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="border px-4 py-2 rounded-full">
                            <Text className="text-gray-600 text-sm">In Transit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="border px-4 py-2 rounded-full">
                            <Text className="text-gray-600 text-sm">Processing</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="border px-4 py-2 rounded-full">
                            <Text className="text-gray-600 text-sm">Delivered</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Order Card */}
                <View className="mb-6">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-xs text-gray-500">October 24, 2023</Text>
                        <Text className="text-xs text-black">In Transit</Text>
                    </View>

                    <View className="flex-row bg-gray-100 p-4 rounded-xl">
                        <Image
                            source={{ uri: "https://via.placeholder.com/100" }}
                            className="w-20 h-20 rounded-lg"
                        />

                        <View className="ml-4 flex-1">
                            <Text className="text-lg font-semibold">
                                Chronos Minimalist Gold
                            </Text>

                            <Text className="text-gray-500 text-sm mb-2">
                                Order #7729-BK
                            </Text>

                            <View className="flex-row justify-between items-center">
                                <Text className="font-bold">$240.00</Text>

                                <TouchableOpacity>
                                    <Text className="text-black text-sm">
                                        Track Order →
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Second Card */}
                <View className="mb-6">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-xs text-gray-500">October 18, 2023</Text>
                        <Text className="text-xs text-black">Delivered</Text>
                    </View>

                    <View className="flex-row bg-gray-100 p-4 rounded-xl">
                        <Image
                            source={{ uri: "https://via.placeholder.com/100" }}
                            className="w-20 h-20 rounded-lg"
                        />

                        <View className="ml-4 flex-1">
                            <Text className="text-lg font-semibold">
                                Velocity Performance Knit
                            </Text>

                            <Text className="text-gray-500 text-sm mb-2">
                                Order #6610-RD
                            </Text>

                            <View className="flex-row justify-between items-center">
                                <Text className="font-bold">$120.00</Text>

                                <TouchableOpacity>
                                    <Text className="text-black text-sm">
                                        Buy Again →
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Help Section */}
                <View className="bg-gray-100 p-6 rounded-2xl mt-6">
                    <Text className="text-lg font-bold mb-2">
                        Need assistance?
                    </Text>

                    <Text className="text-gray-600 text-sm mb-4">
                        Our team is available 24/7 to help you.
                    </Text>

                    <TouchableOpacity className="bg-black py-3 rounded-full">
                        <Text className="text-white text-center font-bold">
                            CONTACT SUPPORT
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}