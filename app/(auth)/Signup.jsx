import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { registerApi } from '../../api/auth.api';
// import { signInWithGoogle } from '../services/authService';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();



  const handleSignUp = async () => {

    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Handle sign up logic here
    console.log('Sign up with:', { name, email, password });

    setLoading(true);

    try {
      const registerData = { name, email, password }
      const response = await registerApi(registerData);

      // console.log(response.data);
      if (response.status === 200) {
        Alert.alert("Success", "OTP sent to your email");

        console.log(response.data);

        // redirect to OTP screen
        router.push({
          pathname: "/otp",
          params: { email: registerData.email }
        });
      }

      // Alert.alert('Success', 'Account created successfully!');
      // router.push('/login');
    } catch (error) {
      console.log("Signup error:", error?.response?.data || error.message);
      Alert.alert('Error', 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // Uncomment when you have the Google sign-in function
      // const result = await signInWithGoogle();

      // Mock Google sign-in for now
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Account created with Google!');
        router.push('/');
      }, 1500);

    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to sign up with Google');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-10">
            {/* Logo Placeholder - Uncomment when you have a logo */}
            {/* <Image
              source={require('../assets/logo.png')}
              className="w-20 h-20 mb-6"
              resizeMode="contain"
            /> */}

            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>

            <Text className="text-gray-600 text-center text-base">
              Sign up to get started with our platform
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Full Name Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-semibold">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4">
                <Image
                  source={{ uri: "https://img.icons8.com/material-rounded/24/000000/user.png" }}
                  className="w-5 h-5 mr-2 opacity-50"
                />
                <TextInput
                  className="flex-1 py-4 text-base"
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-semibold">Email</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4">
                <Image
                  source={{ uri: "https://img.icons8.com/material-rounded/24/000000/new-post.png" }}
                  className="w-5 h-5 mr-2 opacity-50"
                />
                <TextInput
                  className="flex-1 py-4 text-base"
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-gray-700 mb-2 font-semibold">Password</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4">
                <Image
                  source={{ uri: "https://img.icons8.com/material-rounded/24/000000/lock.png" }}
                  className="w-5 h-5 mr-2 opacity-50"
                />
                <TextInput
                  className="flex-1 py-4 text-base"
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text className="text-gray-500 font-medium">
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            {/* <View>
              <Text className="text-gray-700 mb-2 font-semibold">Confirm Password</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4">
                <Image
                  source={{ uri: "https://img.icons8.com/material-rounded/24/000000/lock.png" }}
                  className="w-5 h-5 mr-2 opacity-50"
                />
                <TextInput
                  className="flex-1 py-4 text-base"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text className="text-gray-500 font-medium">
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* Create Account Button */}
            <TouchableOpacity
              className={`bg-black py-4 rounded-xl items-center mt-6 ${loading ? 'opacity-50' : ''
                }`}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text className="text-white text-lg font-semibold">
                {loading ? 'Creating account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 font-medium">OR</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google Sign Up */}
            <TouchableOpacity
              className="bg-white border border-gray-300 py-4 rounded-xl items-center flex-row justify-center"
              onPress={handleGoogleSignUp}
              disabled={loading}
            >
              <Image
                source={{ uri: "https://img.icons8.com/color/24/000000/google-logo.png" }}
                className="w-6 h-6 mr-3"
              />
              <Text className="text-gray-700 text-lg font-medium">
                Sign up with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="mt-10 items-center">
            <Text className="text-gray-600 text-base">
              Already have an account?{' '}
              <Text
                className="text-black font-bold"
                onPress={() => router.push('/login')}
              >
                Sign In
              </Text>
            </Text>
          </View>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;