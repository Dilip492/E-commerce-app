import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddAddress, useAddress } from "../hooks/UseAddress";

export default function CheckoutShipping() {
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [deliveryInstructions, setDeliveryInstructions] = useState("");

    const { data } = useAddress();



    console.log(data);

    useEffect(() => {
        const defaultAddr = data.find(a => a.isDefault);
        if (defaultAddr) {
            setSelectedAddress(defaultAddr._id);
        }
    }, [addresses]);

    const addresses = [
        {
            id: "home",
            label: "Default",
            name: "Johnathan Doe",
            addressLine1: "123 Maple Street, Apt 4B",
            addressLine2: "New York, NY 10001, United States",
            phone: "+1 (555) 012-3456",
        },
        {
            id: "work",
            label: "Work",
            name: "Johnathan Doe",
            addressLine1: "456 Corporate Plaza, Floor 12",
            addressLine2: "Brooklyn, NY 11201, United States",
            phone: "+1 (555) 987-6543",
        },
    ];

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            // Navigate to a safe default screen
            router.replace('/(tabs)'); // or your home screen
        }
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Top App Bar */}
            <SafeAreaView className="bg-white/80 border-b border-gray-100">
                <View className="flex-row items-center justify-between px-4 py-4">
                    <TouchableOpacity
                        onPress={() => handleBack()}
                        className="h-10 w-10 items-center justify-center rounded-full"
                    >
                        <Ionicons name="chevron-back" size={24} color="#0e121b" />
                    </TouchableOpacity>
                    <Text className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Checkout
                    </Text>
                    <View className="w-10" />
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 130 }}
            >
                {/* Progress Stepper */}
                <View className="px-6 py-6">
                    <View className="relative flex-row items-center justify-between">
                        {/* Background Line */}
                        <View className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-gray-100" />

                        {/* Progress Line (50% for shipping) */}
                        <View className="absolute left-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2 bg-black" />

                        {/* Step 1: Shipping */}
                        <View className="relative items-center">
                            <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
                                <Ionicons name="location-outline" size={18} color="#fff" />
                            </View>
                            <Text className="mt-2 text-[10px] font-bold uppercase tracking-tighter text-black-">
                                Shipping
                            </Text>
                        </View>

                        {/* Step 2: Payment */}
                        <View className="relative items-center">
                            <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                                <Ionicons name="card-outline" size={18} color="#9ca3af" />
                            </View>
                            <Text className="mt-2 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                                Payment
                            </Text>
                        </View>

                        {/* Step 3: Review */}
                        <View className="relative items-center">
                            <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                                <Ionicons name="checkmark-outline" size={18} color="#9ca3af" />
                            </View>
                            <Text className="mt-2 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                                Review
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Main Content */}
                <View className="px-6">
                    {/* Header */}
                    <View className="mb-6">
                        <Text className="font-serif text-3xl font-bold text-gray-900">
                            Shipping Address
                        </Text>
                        <Text className="mt-2 text-sm text-gray-500">
                            Select where you would like your order to be delivered.
                        </Text>
                    </View>

                    {/* Address List */}
                    <View className="space-y-4">
                        {data?.map((address) => (
                            <TouchableOpacity
                                key={address._id}
                                onPress={() => setSelectedAddress(address._id)}
                                activeOpacity={0.7}
                                className={`rounded-xl p-5 mt-2 ${selectedAddress === address._id
                                    ? "border-2 border-black-600 bg-black-50"
                                    : "border border-gray-200 bg-white"
                                    }`}
                            >
                                <View className="flex-row justify-between">
                                    <View className="flex-1">
                                        <View className="flex-row items-center gap-2">
                                            <Text
                                                className={`text-xs font-bold uppercase tracking-widest ${selectedAddress === address._id
                                                    ? "text-black"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                {address.isDefault ? "DEfault" : " "}
                                            </Text>
                                            {address.isDefault && (
                                                <View className="rounded-full bg-green-100 px-2 py-0.5">
                                                    <Text className="text-[8px] font-bold text-green-700">
                                                        DEFAULT
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text className="mt-1 text-lg font-bold text-gray-900">
                                            {address.fullName}
                                        </Text>
                                    </View>

                                    {/* Custom Radio */}
                                    <View
                                        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${selectedAddress === address._id
                                            ? "border-black"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        {selectedAddress === address._id && (
                                            <View className="h-2.5 w-2.5 rounded-full bg-black" />
                                        )}
                                    </View>
                                </View>
                                <View className="mt-3 space-y-1">
                                    <Text className="text-gray-600 mt-1">
                                        {address.addressLine}{"\n"}
                                        {address.city}, {address.state} {address.pincode}{"\n"}
                                        {address.country}
                                    </Text>
                                </View>

                                <Text className="text-gray-600 mt-2">{address.phone}</Text>
                                {/* Edit Button */}
                                {selectedAddress === address._id && (
                                    <TouchableOpacity
                                        className="absolute -right-2 -top-2 h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                                    >
                                        <Ionicons name="pencil" size={14} color="#6b7280" />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Add New Address Button */}
                    <TouchableOpacity onPress={() => { router.push("/address") }} className="mt-6 flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-5">
                        <Ionicons name="add" size={20} color="#6b7280" />
                        <Text className="text-sm font-semibold text-gray-500">
                            Add New Address
                        </Text>
                    </TouchableOpacity>

                    {/* Delivery Instructions */}
                    <View className="mt-8">
                        <Text className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            Delivery Instructions (Optional)
                        </Text>
                        <TextInput
                            className="mt-3 h-24 w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm"
                            placeholder="Leave at the front door..."
                            placeholderTextColor="#9ca3af"
                            multiline
                            textAlignVertical="top"
                            value={deliveryInstructions}
                            onChangeText={setDeliveryInstructions}
                        />
                    </View>
                </View>

                {/* Extra bottom padding for footer */}
                <View className="h-10" />
            </ScrollView>

            {/* Bottom Action Bar */}
            <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-6 pb-8 pt-4">
                <View className="mb-3 flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">Order Summary</Text>
                    <Text className="text-sm font-bold text-gray-900">$248.00</Text>
                </View>

                <TouchableOpacity
                    className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-black py-4"
                    activeOpacity={0.8}
                >
                    <Text className="text-sm font-bold text-white">Continue to Payment</Text>
                    <Ionicons name="arrow-forward-outline" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* iOS Home Indicator */}
            <View className="absolute bottom-1 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gray-300" />
        </View>
    );
}