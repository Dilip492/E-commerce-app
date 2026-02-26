import { Tabs } from "expo-router";
// Tabs
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";


export default function RootLayout() {
  return (<Tabs
    screenOptions={{
      headerShown: false, // Remove top header
      tabBarActiveTintColor: "black",
      tabBarShowLabel: false,
      tabBarInactiveTintColor:colors.border,
      tabBarStyle: { backgroundColor: "#fff", height: 70, paddingTop: 10 },
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name="cart"
      options={{
        title: "cart",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="wishlist"
      options={{
        title: "wishlist",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
  </Tabs>
  )
};