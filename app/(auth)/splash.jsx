import { Image, Text, View } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export default function Splash() {

    useEffect(() => {

        async function prepare() {

            // Wait 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Hide native splash
            await SplashScreen.hideAsync();

            // Redirect
            router.replace("/(auth)/login");

            // OR:
            // router.replace("/(tabs)");

        }

        prepare();

    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#0A0F2C",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                source={require("../../assets/images/only_logo.png")}
                style={{
                    width: 140,
                    height: 140,
                    resizeMode: "contain",
                }}
            />

            <Text
                style={{
                    color: "white",
                    fontSize: 40,
                    fontWeight: "bold",
                    marginTop: 20,
                }}
            >
                ShopEase
            </Text>

            <Text
                style={{
                    color: "#B0B7D1",
                    marginTop: 10,
                    fontSize: 16,
                }}
            >
                Fast. Trustworthy. Easy.
            </Text>
        </View>
    );
}