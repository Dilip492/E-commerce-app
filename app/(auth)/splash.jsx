    import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

    export default function SplashScreen() {
        const router = useRouter();
        
        const lineWidth = useRef(new Animated.Value(0)).current;
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const rotateAnim = useRef(new Animated.Value(0)).current;
        const translateY = useRef(new Animated.Value(30)).current;
        
        const [isReady, setIsReady] = useState(false);

        const spin = rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        useEffect(() => {
            // Sequence of minimal animations
            Animated.sequence([
                // Fade in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                // Animate line
                Animated.parallel([
                    Animated.timing(lineWidth, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: false,
                        easing: Easing.inOut(Easing.ease),
                    }),
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.back(1)),
                    }),
                    Animated.timing(rotateAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.ease),
                    }),
                ]),
            ]).start();

            // Auto redirect
            setTimeout(() => {
                setIsReady(true);
            }, 2000);
        }, []);

        useEffect(() => {
            if (isReady) {
                router.replace('/login');
            }
        }, [isReady]);

        return (
            <View className="flex-1 bg-[#f8f8f8]">
                <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
                
                <SafeAreaView className="flex-1">
                    <View className="flex-1 items-center justify-center px-8">
                        {/* Animated Circle */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ rotate: spin }]
                            }}
                            className="mb-8"
                        >
                            <View className="w-20 h-20 rounded-full border border-black/20 items-center justify-center">
                                <View className="w-10 h-10 rounded-full bg-black/5" />
                            </View>
                        </Animated.View>

                        {/* Animated Line */}
                        <Animated.View
                            style={{
                                width: lineWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '30%']
                                }),
                                height: 1,
                                backgroundColor: '#000',
                                marginBottom: 24,
                            }}
                        />

                        {/* Text with slide up */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY }]
                            }}
                            className="items-center"
                        >
                            <Text className="text-3xl font-thin tracking-[0.2em] text-black mb-2">
                                ECHO
                            </Text>
                            <Text className="text-[10px] font-light tracking-[0.4em] text-gray-300 uppercase">
                                less is more
                            </Text>
                        </Animated.View>
                    </View>

                    {/* Minimal Loading Indicator */}
                    <View className="items-center pb-10">
                        <View className="w-8 h-8 items-center justify-center">
                            <View className="w-1 h-1 bg-black/30 rounded-full" />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }