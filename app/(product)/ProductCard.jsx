import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { colors } from "../../theme/colors";

import { useRouter } from "expo-router";

export default function ProductCard({ item }) {

    const router = useRouter();

    const [like, setLike] = useState(false)
    return (
        <Pressable
            onPress={() => router.push({
                pathname: "/(product)/[id]",
                params: { id: item.id },
            })}
            key={item.id}
        >
            <View
                className="w-48 rounded-xl border border-gray-100 overflow-hidden bg-white"
            >
                {/* Image Section */}
                <View className="relative h-36">
                    <Image
                        source={item.image}
                        className="w-full h-full"
                        resizeMode="fit"
                    />

                    {/* Wishlist Heart */}
                    <Pressable
                        onPress={(e) => {
                            e.stopPropagation();
                            setLike(!like);
                        }}
                        className="absolute top-2 right-2"
                    >
                        <View className="w-7 h-7 bg-white rounded-full items-center justify-center shadow-sm">
                            <Ionicons
                                name={like ? "heart" : "heart-outline"}
                                size={16}
                                color={like ? "#ff2d55" : "#9CA3AF"}
                            />
                        </View>
                    </Pressable>
                </View>

                {/* Product Info */}
                <View className="p-3">
                    {/* Category */}
                    <View className="flex-row items-center mb-1">
                        <Text className="text-xs text-gray-500">{item.category}</Text>
                        <Image
                            source={require('../../assets/images/tick.jpg')}
                            className="h-3 w-3 ml-1"
                        />
                    </View>

                    {/* Title */}
                    <Text className="text-sm font-semibold text-gray-900 mb-2" numberOfLines={2}>
                        {item.title}
                    </Text>

                    {/* Rating and Stock */}
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={12} color="#F5A623" />
                            <Text className="text-xs text-gray-600 ml-1">{item.rating}</Text>
                        </View>
                        <Text className="text-xs text-gray-500">{item.stock} left</Text>
                    </View>

                    {/* Price */}
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-bold text-gray-900">₹{item.price}</Text>
                        <View className="w-7 h-7 bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="add" size={16} color="#6B7280" />
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}