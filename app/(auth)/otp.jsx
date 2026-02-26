import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { verifyotp } from "../../api/auth.api";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useLocalSearchParams();

  // const email = 'user@example.com';

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to focus previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter complete 6-digit code');
      return;
    }

    setLoading(true);

    try {
      const response = await verifyotp({
        email,
        otp: otpString
      });

      if (response.status === 200) {

        Alert.alert('Success', 'Account verified successfully!');
        await SecureStore.setItemAsync(
          "accessToken",
          response.data.token
        );


        console.log("Server response:", response.data);

        router.replace('/(tabs)') // redirect after success
      }
    } catch (error) {
      console.log("OTP verify error:", error?.response?.data || error.message);
      Alert.alert('Error', 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
    // Simulate verification
    // setTimeout(() => {
    //   setLoading(false);
    //   Alert.alert('Success', 'Email verified successfully!');
    //   router.push('/home');
    // }, 1500);
  };

  const handleResendCode = () => {
    Alert.alert('Success', 'New code sent to your email');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex justify-center px-4 pt-6">
          {/* Top App Bar */}
          <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-start"
            >
              <Ionicons name="chevron-back" size={24} color="#0e121b" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900 flex-1 text-center pr-10">
              Verification
            </Text>
          </View>

          {/* Icon/Visual Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-gray-100 rounded-3xl items-center justify-center">
              <Ionicons name="mail-open-outline" size={40} />
            </View>
          </View>

          {/* Text Content */}
          <View className="items-center mb-12">
            <Text className="text-gray-900 text-3xl font-extrabold tracking-tight mb-3">
              Verify your email
            </Text>
            <Text className="text-gray-500 text-base leading-relaxed text-center">
              Enter the 6-digit code we sent to{' '}
              <Text className="text-gray-900 font-semibold">{email}</Text>
            </Text>
          </View>

          {/* OTP Input Fields */}
          <View className="flex-row justify-center gap-4 mb-10">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="h-16 w-14 text-center text-2xl font-bold bg-gray-50 rounded-xl text-gray-900 border-2 border-transparent focus:border-blue-600"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="-"
                placeholderTextColor="#9ca3af"
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend Link */}
          <View className="items-center mb-auto">
            <Text className="text-gray-500 text-sm font-medium">
              Didn't receive the code?{' '}
              <Text
                className="text-gray-700 font-bold"
                onPress={handleResendCode}
              >
                Resend Code
              </Text>
            </Text>
          </View>

          {/* Verify Button */}
          <View className="pt-6 pb-12">
            <TouchableOpacity
              className={`w-full bg-black py-4 rounded-xl flex-row items-center justify-center gap-2 shadow-lg shadow-blue-600/20 ${loading ? 'opacity-50' : ''
                }`}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                {loading ? 'Verifying...' : 'Verify'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Bottom Safe Area Indicator */}
          <View className="h-1.5 w-32 bg-gray-200 rounded-full mx-auto mb-2" />
        </View>
      </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}