import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddAddress, useAddress, useEditAddress, useRemoveAddress } from "../hooks/UseAddress";

export default function AddressScreen() {


  const { data } = useAddress();
  const { mutate: addAddress } = useAddAddress();
  const { mutate: removeAddress } = useRemoveAddress();
  const { mutate: editAddress } = useEditAddress();


  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);


  // console.log("address", data.addresses);
  console.log(data); // ✅


  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressLine: "",
    isDefault: false,
  });
  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderColor: "#eee"
      }}>
        <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="#000" />
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Shipping Addresses</Text>
        <Ionicons onPress={() => router.push('/profile')} name="settings-outline" size={24} color="#000" />
      </View>
      <ScrollView className="px-4 mt-4">

        {/* Title */}
        <View className="mb-6">
          <Text className="text-xs text-gray-500 uppercase">Shipping Management</Text>
          <Text className="text-2xl font-semibold mt-1">Saved Addresses</Text>
          {/* <Text className="text-gray-500 text-sm mt-1">
            Manage your delivery locations for faster checkout.
          </Text> */}
        </View>



        {/* Address Card - Default */}

        {
          data?.map((item) => {
            return (
              <View key={item._id} className="bg-gray-100 rounded-xl p-4 mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-xs bg-black text-white px-2 py-1 rounded-full">
                    {item.isDefault ? "Default" : " "}
                  </Text>
                  <Text className="font-semibold text-lg">Home</Text>
                </View>

                <Text className="font-semibold">{item.fullName}</Text>
                <Text className="text-gray-600 mt-1">
                  {item.addressLine}{"\n"}
                  {item.city}, {item.state} {item.pincode}{"\n"}
                  {item.country}
                </Text>

                <Text className="text-gray-600 mt-2">📞 {item.phone}</Text>

                <View className="flex-row gap-6 mt-4 border-t pt-3 border-gray-200">
                  <TouchableOpacity onPress={() => {
                    setForm(item);
                    setEditingId(item._id);
                    setModalVisible(true);
                  }}>
                    <Text className="text-black text-xs font-bold uppercase">
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    Alert.alert(
                      "Delete Address",
                      "Are you sure?",
                      [
                        { text: "Cancel" },
                        { text: "Delete", onPress: () => removeAddress(item._id) }
                      ]
                    );
                  }}>
                    <Text className="text-red-500 text-xs font-bold uppercase">
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })

        }

        {/* Address Card - Office */}
        {/* <View className="bg-gray-100 rounded-xl p-4 mb-4">
          <Text className="font-semibold text-lg mb-2">Office</Text>

          <Text className="font-semibold">Alexander Sterling</Text>
          <Text className="text-gray-600 mt-1">
            101 Tech Plaza, 4th Floor{"\n"}
            San Francisco, CA 94105{"\n"}
            United States
          </Text>

          <Text className="text-gray-600 mt-2">📞 +1 (555) 987-6543</Text>

          <View className="flex-row gap-6 mt-4 border-t pt-3 border-gray-200">
            <TouchableOpacity>
              <Text className="text-black text-xs font-bold uppercase">
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-red-500 text-xs font-bold uppercase">
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Add New Address */}
        <TouchableOpacity onPress={() => setModalVisible(true)} className="border-2 border-dashed border-gray-300 p-5 rounded-xl flex-row justify-center items-center gap-2">
          <View className="bg-black p-2 rounded-full">
            <Ionicons name="add" size={16} color="#fff" />
          </View>
          <Text className="text-sm font-bold uppercase">
            Add New Address
          </Text>
        </TouchableOpacity>

        {/* Promo Card */}
        <View className="bg-black p-5 rounded-2xl mt-8">
          <Text className="text-white text-lg font-semibold mb-2">
            Concierge Delivery
          </Text>

          <Text className="text-gray-300 text-sm">
            Premium members enjoy fast delivery service within 24 hours.
          </Text>
        </View>

      </ScrollView>


      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/50 justify-end">

          <View className="bg-white rounded-t-3xl p-5 max-h-[90%]">

            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Add Address</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Full Name */}
              <TextInput
                placeholder="Full Name"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* Phone */}
              <TextInput
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* Address Line */}
              <TextInput
                placeholder="Address Line"
                multiline
                value={form.addressLine}
                onChangeText={(text) => setForm({ ...form, addressLine: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* Pincode */}
              <TextInput
                placeholder="Pincode"
                keyboardType="numeric"
                value={form.pincode}
                onChangeText={(text) => setForm({ ...form, pincode: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* City */}
              <TextInput
                placeholder="City"
                value={form.city}
                onChangeText={(text) => setForm({ ...form, city: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* State */}
              <TextInput
                placeholder="State"
                value={form.state}
                onChangeText={(text) => setForm({ ...form, state: text })}
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />

              {/* Country */}
              <TextInput
                placeholder="Country"
                value={form.country}
                onChangeText={(text) => setForm({ ...form, country: text })}
                className="border border-gray-300 rounded-lg p-3 mb-4"
              />

              {/* Default Toggle */}
              <TouchableOpacity
                onPress={() => setForm({ ...form, isDefault: !form.isDefault })}
                className="flex-row items-center mb-4"
              >
                <View className={`w-5 h-5 mr-2 border rounded ${form.isDefault ? "bg-black" : "bg-white"}`} />
                <Text>Set as default address</Text>
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                className="bg-black py-3 rounded-full mb-2"
                onPress={() => {

                  if (editingId) {
                    editAddress({ id: editingId, data: form },
                      {
                        onSuccess: () => {
                          setEditingId(null);
                          setModalVisible(false)
                        }
                      }
                    )
                  } else {
                    addAddress(form, {
                      onSuccess: () => {
                        setModalVisible(false);
                      }

                    })
                  }

                  // reset the form 
                  setForm({
                    fullName: "",
                    phone: "",
                    pincode: "",
                    city: "",
                    state: "",
                    country: "",
                    addressLine: "",
                    isDefault: false,
                  });
                }}
              >
                <Text className="text-white text-center font-bold">
                  Save Address
                </Text>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-center text-gray-500 mb-4">
                  Cancel
                </Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}