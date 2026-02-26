import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../components/OrderCard";

export default function OrdersScreen() {
    return (

        <SafeAreaView className="flex-1 bg-gray-100" >

            <ScrollView >

                {/* Header */}
                <View className="px-4 py-4 bg-white">
                    <Text className="text-xl font-bold text-gray-900">
                        My Orders
                    </Text>
                    <Text className="text-gray-500 text-sm">
                        Track and manage your orders
                    </Text>
                </View>

                {/* Orders List */}
                <View className="mt-4">
                    <OrderCard
                        orderId="#ORD12345"
                        date="12 Jan 2026"
                        status="Delivered"
                        total="₹2,499"
                        image="https://via.placeholder.com/100"
                    />

                    <OrderCard
                        orderId="#ORD12346"
                        date="18 Jan 2026"
                        status="In Transit"
                        total="₹1,299"
                        image="https://via.placeholder.com/100"
                    />

                    <OrderCard
                        orderId="#ORD12347"
                        date="20 Jan 2026"
                        status="Cancelled"
                        total="₹899"
                        image="https://via.placeholder.com/100"
                    />
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}
