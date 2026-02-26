import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function MenuItem({ icon, title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between p-3"
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={20} color="#111827" />
        <Text className="ml-3 text-gray-900 font-medium">
          {title}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </Pressable>
  );
}
