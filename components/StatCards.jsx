import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const StatItem = ({ icon, label, value }) => (
  <View className="flex-1 items-center">
    <Ionicons name={icon} size={22} color="#F97316" />
    <Text className="text-lg font-bold mt-1">{value}</Text>
    <Text className="text-gray-500 text-xs">{label}</Text>
  </View>
);

export default function StatsCards() {
  return (
    <View className="flex-row bg-white mx-4 mt-4 p-4 rounded-2xl">
      <StatItem icon="cube-outline" label="Orders" value="12" />
      <StatItem icon="car-outline" label="In Transit" value="3" />
      <StatItem icon="heart-outline" label="Wishlist" value="5" />
    </View>
  );
}
