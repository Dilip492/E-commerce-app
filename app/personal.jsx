import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Useuser from "../hooks/Useuser";

export default function ProfileScreen() {

    const { User } = Useuser();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            {/* Header */}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderColor: "#eee"
            }}>
                <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="#000" />
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Personal Information</Text>
                <Ionicons onPress={() => router.push('/profile')} name="settings-outline" size={24} color="#000" />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>

                {/* Profile Image */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <View style={{ position: "relative" }}>
                        {/* User Icon Circle */}
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 55,
                                backgroundColor: "#f1f3f9",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Ionicons name="person" size={50} color="#000" />
                        </View>



                    </View>

                    <Text className="font-serif text-3xl font-bold text-center tracking-tight text-gray-900">
                        {User ? User.user.name : "Guest user"}
                    </Text>
                </View>

                {/* Form */}
                <View style={{ gap: 20 }}>

                    {/* Full Name */}
                    <View>
                        <Text style={label}>Full Name</Text>
                        <TextInput
                            style={input}
                            placeholder="Enter name"
                            defaultValue={ User ? User.user.name : "Julianne Sterling"}
                        />
                    </View>

                    {/* Email */}
                    <View>
                        <Text style={label}>Email Address</Text>
                        <TextInput
                            style={input}
                            placeholder="Enter email"
                            defaultValue={User.user.email}
                        />
                    </View>

                    {/* Row */}
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={label}>Phone</Text>
                            <TextInput
                                style={input}
                                placeholder="Phone"
                                defaultValue="+91 9999999999"
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={label}>DOB</Text>
                            <TextInput
                                style={input}
                                placeholder="DOB"
                                defaultValue="12 March 1994"
                            />
                        </View>
                    </View>

                </View>

                {/* Divider */}
                <View style={{
                    height: 1,
                    backgroundColor: "#eee",
                    marginVertical: 30
                }} />

                {/* Preferences */}
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    padding: 15,
                    borderRadius: 12
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Ionicons name="notifications-outline" size={22} color="#000" />
                        <View>
                            <Text style={{ fontWeight: "600" }}>
                                Communication Preferences
                            </Text>
                            <Text style={{ fontSize: 12, color: "#777" }}>
                                Manage how we contact you
                            </Text>
                        </View>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {/* Buttons */}
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#000",
                        padding: 16,
                        borderRadius: 30,
                        alignItems: "center"
                    }}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Save Changes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        marginTop: 10,
                        alignItems: "center"
                    }}>
                        {/* <Text style={{ color: "red", fontWeight: "bold" }}>
                            Delete Account
                        </Text> */}
                    </TouchableOpacity>
                </View>

            </ScrollView>



        </SafeAreaView>
    );
}



const label = {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    color: "#666"
};

const input = {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 10,
    fontSize: 14
};