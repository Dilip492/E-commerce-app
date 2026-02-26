import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export default function ProfileHeader() {
  return (
    <View className="bg-white mx-4 mt-4 p-4 rounded-2xl flex-row items-center">
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        className="w-16 h-16 rounded-full"
      />

      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-gray-900">
          Dilip Pal
        </Text>
        <Text className="text-gray-500 text-sm">
          dilip@email.com
        </Text>
      </View>

      <Pressable className="p-2 bg-gray-100 rounded-full">
        <Ionicons name="pencil" size={18} color="#111827" />
      </Pressable>
    </View>
  );
}
