import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function OrderCard({
  orderId,
  date,
  status,
  total,
  image,
}) {
  const router = useRouter();

  const statusColor = {
    Delivered: "bg-green-100 text-green-700",
    "In Transit": "bg-orange-100 text-orange-700",
    Cancelled: "bg-red-100 text-red-700",
  }[status];

  return (
    <View className="bg-white mx-4 mb-4 rounded-2xl p-4 shadow-sm">
      
      {/* Top Row */}
      <View className="flex-row justify-between items-center">
        <Text className="font-semibold text-gray-900">
          {orderId}
        </Text>

        <Text className={`px-3 py-1 rounded-full text-xs ${statusColor}`}>
          {status}
        </Text>
      </View>

      <Text className="text-gray-500 text-xs mt-1">
        Ordered on {date}
      </Text>

      {/* Product Preview */}
      <View className="flex-row mt-4">
        <Image
          source={{ uri: image }}
          className="w-16 h-16 rounded-xl bg-gray-100"
        />

        <View className="ml-4 flex-1">
          <Text className="text-gray-700 text-sm">
            Total Amount
          </Text>
          <Text className="font-bold text-gray-900 mt-1">
            {total}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <Pressable
        onPress={() => router.push(`/order/${orderId}`)}
        className="mt-4 flex-row justify-between items-center"
      >
        <Text className="text-orange-500 font-semibold">
          View Order Details
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#F97316" />
      </Pressable>

    </View>
  );
}
