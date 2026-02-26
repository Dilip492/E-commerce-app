import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";

export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
        { id: "personal", icon: "person-outline", label: "Personal Information", route: "/profile/personal" },
        { id: "orders", icon: "bag-outline", label: "My Orders", route: "/profile/orders" },
        { id: "shipping", icon: "cube-outline", label: "Shipping Addresses", route: "/address" },
        { id: "payment", icon: "card-outline", label: "Payment Methods", route: "/profile/payment" },
        { id: "notifications", icon: "notifications-outline", label: "Notifications", route: "/profile/notifications" },
        { id: "privacy", icon: "shield-checkmark-outline", label: "Privacy Policy", route: "/profile/privacy" },
    ];

    //   const handleLogout = async () => {


    //   }

    const handleSignOut = async () => {
        await SecureStore.deleteItemAsync("accessToken");

        console.log("Token deleted");

        // Alert.alert("Logged out", "You have been logged out");

        // router.replace("/login"); // prevents going back
        router.replace("/(auth)/login");
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */}
            <SafeAreaView className="bg-white">
                <View className="flex-row items-center justify-between px-6 pt-2 pb-4">
                    <Text className="font-serif text-2xl font-bold text-gray-900">
                        Profile
                    </Text>
                    <TouchableOpacity className="p-2 rounded-full bg-gray-50">
                        <Ionicons name="settings-outline" size={22} color="#4b5563" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* User Identity Section */}
                <View className="items-center px-6 py-6">
                    <View className="relative mb-4">
                        <View className="w-28 h-28 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100">
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpjXd1fN15xdirdjOUyifT-DqeuB2odhi3qw2q_wuGQv1wSMvxhH9odvF5eQ3rLiAZEIb2IY3FvhsjwgEeYaaGyoteETUXhztCFDby-DuzTowVV5W1PSnzIoR9043fXvrzxf3gookr9XYAZmZHjpIEkuRJEZqJpmI2r7a-ZcpoqOh3BmBeAWoLzqcasoASxF6ZO7Ms26uMJ6up8eFO1XXaSOOSzsicVjh_CA6VgmXG4KbnuR6adfb-8C8RCRc986xelfynKL7oudI" }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-lg border-2 border-white">
                            <Ionicons name="pencil" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <Text className="font-serif text-3xl font-bold text-center tracking-tight text-gray-900">
                        Julianne Smith
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1 font-medium">
                        Premium Member since 2023
                    </Text>
                </View>

                {/* Profile Menu List */}
                <View className="px-6">
                    <View className="bg-white rounded-xl overflow-hidden border border-gray-100">
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => router.push(item.route)}
                                className={`flex-row items-center justify-between py-4 px-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                                activeOpacity={0.7}
                            >
                                <View className="flex-row items-center gap-4">
                                    <Ionicons name={item.icon} size={22} color="#6b7280" />
                                    <Text className="text-[15px] font-medium text-gray-700">
                                        {item.label}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sign Out Button */}
                    <View className="py-8">
                        <TouchableOpacity
                            onPress={handleSignOut}
                            className="w-full flex-row items-center justify-center gap-2 py-4 rounded-xl border border-gray-200"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="log-out-outline" size={20} color="#f43f5e" />
                            <Text className="text-rose-500 font-semibold text-base">
                                Sign Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}