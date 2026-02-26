import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function AddressScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      
      {/* Header */}
      <View className="bg-white px-4 py-4">
        <Text className="text-xl font-bold text-gray-900">
          Address Book
        </Text>
        <Text className="text-gray-500 text-sm">
          Manage your delivery addresses
        </Text>
      </View>

      {/* Address Card */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-2xl">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="font-semibold text-gray-900">
              Home
            </Text>
            <Text className="text-gray-600 mt-1 text-sm">
              Dilip Pal
            </Text>
            <Text className="text-gray-600 text-sm">
              21, MG Road, Near Metro Station
            </Text>
            <Text className="text-gray-600 text-sm">
              Bengaluru, Karnataka - 560001
            </Text>
            <Text className="text-gray-600 text-sm">
              Phone: 9876543210
            </Text>
          </View>

          <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
        </View>

        {/* Actions */}
        <View className="flex-row mt-4">
          <Pressable className="mr-4">
            <Text className="text-orange-500 font-semibold">
              Edit
            </Text>
          </Pressable>

          <Pressable>
            <Text className="text-red-500 font-semibold">
              Delete
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Add New Address Button */}
      <Pressable className="mx-4 mt-6 bg-orange-500 p-4 rounded-2xl flex-row justify-center items-center">
        <Ionicons name="add" size={22} color="white" />
        <Text className="text-white font-semibold ml-2">
          Add New Address
        </Text>
      </Pressable>

    </ScrollView>
  );
}
