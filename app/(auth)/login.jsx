import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics";
import { useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from "react-native-toast-message";


import { UseLogin } from "../../hooks/UseAuth";

// import { loginApi } from "../../api/auth.api";
// import { signInWithGoogle } from '../services/authService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { mutate, isPending } = UseLogin();




  const router = useRouter();
  const handleLogin = async () => {
    // setLoading(true)
    if (!email || !password) {
      // Alert.alert('Error', 'Please fill in all fields');
      // 🔥 HAPTIC FEEDBACK
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );

      // 🎉 TOAST
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
        position: "top",
      });

      return;
    }

    // const savedToken = await SecureStore.getItemAsync("accessToken");
    // console.log("Saved token:", savedToken);
    // Handle email/password login here
    console.log('Login with:', logindata);
    // loginApi(logindata)

    const logindata = { email, password };

    mutate(logindata, {
      onSuccess: async (data) => {
        await SecureStore.setItemAsync(
          "accessToken",
          data?.data?.token
        );

        console.log("Server response:", data?.status);

        router.replace('/(tabs)');
      },
      onError: (error) => {
        console.log("login error", error);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error?.response?.data?.message || "Please try again",
          position: "top",
          visibilityTime: 3000,
        });
      }
    })

  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);

    if (result.success) {
      // Alert.alert('Success', `Welcome ${result.user.name}!`);
      // Navigate to home or dashboard
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-12">
            {/* <Image
              source={require('../assets/logo.png')}
              className="w-24 h-24 mb-6"
              resizeMode="contain"
            /> */}
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <View>
              <Text className="text-gray-600 text-center">
                Sign in to continue to your account
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-black mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-surface border border-gray-300 rounded-xl px-4 py-4 text-base"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-black mb-2 mt-2 font-medium">Password</Text>
              <TextInput
                className="bg-surface border border-gray-300 rounded-xl px-4 py-4 text-base"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity className="self-end mt-4 mb-4">
                <Text className="text-primary font-medium">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="bg-black py-4 rounded-xl items-center"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white text-lg font-semibold  ">
                {isPending ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">OR</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              className="bg-surface border border-gray-300 py-4 rounded-xl items-center flex-row justify-center"
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              <Image
                // source={require('../assets/google-icon.png')}
                source={{ uri: "https://img.icons8.com/color/24/000000/google-logo.png" }}

                className="w-6 h-6 mr-3"
              />
              <Text className="text-gray-700 text-lg font-medium">
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="mt-12 items-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Text
                className="text-black font-semibold"
                // onPress={() => router.push('/otp')}
                onPress={() => router.push('/Signup')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;