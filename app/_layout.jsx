import { QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import queryClient from "../hooks/queryClient";
import { toastConfig } from "../utils/toastconfig";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const storedToken = await SecureStore.getItemAsync("accessToken");
      setToken(storedToken);
      setReady(true);
      await SplashScreen.hideAsync(); // 🔥 hide only after auth check
    };

    init();
  }, []);

  if (!ready) return null;

  const inAuthGroup = segments[0] === "(auth)";

  if (!token && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  if (token && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
        </>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
