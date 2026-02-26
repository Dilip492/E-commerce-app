import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Categories() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("categories");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header - Only one SafeAreaView at the top */}
            <SafeAreaView className="bg-white">
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2"
                    >
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text className="text-lg font-bold tracking-tight text-black">
                        Categories
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push('/cart')}
                        className="p-2"
                    >
                        <Ionicons name="bag-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Content Area */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Search Bar */}
                <View className="px-5 py-4">
                    <View className="relative">
                        <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
                            <Ionicons name="search-outline" size={20} color="#9ca3af" />
                        </View>
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search for products or brands..."
                            placeholderTextColor="#9ca3af"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm"
                        />
                    </View>
                </View>

                {/* Categories Grid */}
                <View className="px-5">
                    {/* Category Item: Menswear */}
                    <TouchableOpacity className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8TVfH1zDagnWMMDoLg1PgSJgQ9Ftu9mEnJvNEeuWphpQ-MTgWCWZlsIRfUQK_6fVMGRJO5ie94FtGWRFyrK8piXbQGJUKmGYL6-RWPjFCVuP1SGO3fziOeyq42Pk-8enCOq0LhdpPcoUmEzGE_ol-hUTm-D3QTMKRbL5YOY26vd1vmnU9TwFBaCG4i9UbuGiJ9kUNSwqyXKJLbSux9LgEgTsHzMx0IWtUoM49nMKj_0tbOiSU55UKaFRERqcBG6jLkSOesZf6X-8" }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 bg-black/40" />
                        <View className="absolute inset-0 flex-col justify-end p-5">
                            <Text className="text-white text-2xl font-bold tracking-tight">
                                Menswear
                            </Text>
                            <Text className="text-white/80 text-sm font-medium">
                                Shop New Arrivals
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Category Item: Womenswear */}
                    <TouchableOpacity className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvZxEGxt2X7LGYo2crowUWh-pI2zQ6i1_5ltIvQJXvyBlJDtXtXyUFQ-n0YtHAUZZ8v8eoy28tSAOy8lttiUlcsx2l9dvgXVa-QWn-8aoht7y1_53NMSn8DXLIVzZRGEIwNRzIDLqbrgkX2giP_XYNfOTQ2kUVz-RQDVdek9PLTu6paiFTHBFZyLPXvmipy3IPfEHu_NEcKa7MgSVl3SwW3f2AV2o9wbjomodFNXl-uH-buVjTufSA-671WtZ2eMTUfDShQbXAC0s" }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 bg-black/40" />
                        <View className="absolute inset-0 flex-col justify-end p-5">
                            <Text className="text-white text-2xl font-bold tracking-tight">
                                Womenswear
                            </Text>
                            <Text className="text-white/80 text-sm font-medium">
                                Summer Collection '24
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Two Column Layout */}
                    <View className="flex-row gap-4 mb-4">
                        {/* Accessories */}
                        <TouchableOpacity className="flex-1 overflow-hidden rounded-xl aspect-square">
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3F-naTdb68vaz4a1FxUkUjkwAiUOjyJw7gamTFOM12k21TE1Jy69CYQ_XfXPefr8KvJK9vVqlwIe0v6pOadp_UCNuX-iAgI3KTQxkWIMnxTAkBPbk0QTn9ATYw0pwtJqTtR8C9KTaFrgPDInZAy_q-WMWNu2rnkbwd6hcM-8eWD_cy7CUIHb6H96N2vHHzlfwVA7qMRjQEq8J_ZWhW9ClJvaYoxqnhqZIomiUT16b3mnKHXkh0If2iDolPUFog-WBY3QNrmFyaTk" }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute inset-0 bg-black/40" />
                            <View className="absolute inset-0 flex-col justify-end p-4">
                                <Text className="text-white text-lg font-bold leading-tight">
                                    Accessories
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Home Decor */}
                        <TouchableOpacity className="flex-1 overflow-hidden rounded-xl aspect-square">
                            <Image
                                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9WlFI91WbP2Wca1tJYxWxWDuhx-67xRdTstReR42pynxvAE73zMZFaNog-G-5nYOlTzfIXd_HAbTQKDQNR7hi1Mpo5V6dKyZZ02Ge_ud3K78yWevhYE6S1uyYoxA__-6K9jhIlohUhgZ8JJy8e3D5H8-MHPzOQeaoIiaWWBgHPj9BuqOYgylj7fzqgygp0Iw9AClPvS0w4ZUar8mvKDxxP-s3c3_A6REp8DjwImmt4LQnVoSfib3g3FYd8dKM9LjdFa2Omn3khho" }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute inset-0 bg-black/40" />
                            <View className="absolute inset-0 flex-col justify-end p-4">
                                <Text className="text-white text-lg font-bold leading-tight">
                                    Home Decor
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Kids & Baby */}
                    <TouchableOpacity className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
                        <Image
                            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuARhEgS3ucQtL654JoICEcQqJv4mSpCdwVz-w5FgWQqhh5CZ0tX-N-zsWdn2zX7MD5X7puAOKlxUK5YFUYg1LiOYBcKoY0nvARJk0LWO1RT41gpZTw3ghvR7Dn7vqJH7uGpiukvc1kHcw3Xa_8iHaLuRF4CleEHQ2p0Yv_ET2V3_vVA4bXa2a8xmzDHkGGs0PSYm2VtF8iXhEQZINdNX_XYF0phU4DMwSomjBqIN_jzfJ193JoYdaJc1wkX8Rmd5q-kYOcgdc9rlY8" }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 bg-black/40" />
                        <View className="absolute inset-0 flex-col justify-end p-5">
                            <Text className="text-white text-2xl font-bold tracking-tight">
                                Kids & Baby
                            </Text>
                            <Text className="text-white/80 text-sm font-medium">
                                Sustainable & Soft
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Promotion Section - Black & White Version */}
                <View className="mx-5 my-8 p-6 bg-gray-100 rounded-2xl border border-gray-300">
                    <Text className="text-black font-bold text-lg">Personal Shopper</Text>
                    <Text className="text-sm text-gray-700 mt-1 mb-4">
                        Can't find what you're looking for? Let our stylists help you.
                    </Text>
                    <TouchableOpacity className="w-full py-2.5 bg-black rounded-lg">
                        <Text className="text-white text-sm font-bold text-center">
                            Chat with a Stylist
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}