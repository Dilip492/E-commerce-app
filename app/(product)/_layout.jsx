import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ProductLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,

        // Smooth native feel
        animation: Platform.OS === "ios"
          ? "slide_from_right"
          : "fade",

        // Gesture support (iOS)
        gestureEnabled: true,

        // Screen background
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    />
  );
}
