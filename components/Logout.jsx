import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, Text } from "react-native";

export default function LogoutButton() {

  const router = useRouter();
  
  const handleLogout = async () => {
   await SecureStore.deleteItemAsync("accessToken");

    console.log("Token deleted");

    // Alert.alert("Logged out", "You have been logged out");

    // router.replace("/login"); // prevents going back
     router.replace("/(auth)/login");
         
  }
  return (
    <Pressable className="mx-4 my-6 bg-red-50 p-4 rounded-2xl flex-row justify-center items-center" onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={20} color="#DC2626" />
      <Text className="ml-2 text-red-600 font-semibold">
        Logout
      </Text>
    </Pressable>
  );
}
