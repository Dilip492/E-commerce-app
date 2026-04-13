import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";

const { width } = Dimensions.get('window');

export const toastConfig = {
  success: ({ text1, text2 }) => {
    useEffect(() => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }, []);

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={{
            width: width - 32,
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: "#ffffff",
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 12,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          {/* Icon Container */}
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              backgroundColor: "#22c55e12",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              borderWidth: 1,
              borderColor: "#22c55e20",
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#22c55e",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark" size={16} color="#ffffff" />
            </View>
          </View>

          {/* Text Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#1f2937",
                fontWeight: "600",
                fontSize: 15,
                letterSpacing: -0.3,
                marginBottom: text2 ? 4 : 0,
              }}
            >
              {text1}
            </Text>

            {text2 && (
              <Text
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: "400",
                  lineHeight: 18,
                }}
              >
                {text2}
              </Text>
            )}
          </View>

          {/* Decorative element */}
          <View
            style={{
              width: 4,
              height: 40,
              borderRadius: 2,
              backgroundColor: "#22c55e",
              opacity: 0.3,
            }}
          />
        </LinearGradient>
      </View>
    );
  },

  error: ({ text1, text2 }) => {
    useEffect(() => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
    }, []);

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <LinearGradient
          colors={['#ffffff', '#fef2f2']}
          style={{
            width: width - 32,
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 12,
            borderWidth: 1,
            borderColor: "#fee2e2",
          }}
        >
          {/* Icon Container */}
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              backgroundColor: "#ef444412",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              borderWidth: 1,
              borderColor: "#ef444420",
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#ef4444",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="close" size={16} color="#ffffff" />
            </View>
          </View>

          {/* Text Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#1f2937",
                fontWeight: "600",
                fontSize: 15,
                letterSpacing: -0.3,
                marginBottom: text2 ? 4 : 0,
              }}
            >
              {text1}
            </Text>
            {text2 && (
              <Text
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: "400",
                  lineHeight: 18,
                }}
              >
                {text2}
              </Text>
            )}
          </View>

          {/* Decorative element */}
          <View
            style={{
              width: 4,
              height: 40,
              borderRadius: 2,
              backgroundColor: "#ef4444",
              opacity: 0.3,
            }}
          />
        </LinearGradient>
      </View>
    );
  },

  info: ({ text1, text2 }) => {
    useEffect(() => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
    }, []);

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <LinearGradient
          colors={['#ffffff', '#eff6ff']}
          style={{
            width: width - 32,
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 12,
            borderWidth: 1,
            borderColor: "#dbeafe",
          }}
        >
          <View
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              backgroundColor: "#3b82f612",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              borderWidth: 1,
              borderColor: "#3b82f620",
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#3b82f6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="information" size={16} color="#ffffff" />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#1f2937",
                fontWeight: "600",
                fontSize: 15,
                letterSpacing: -0.3,
                marginBottom: text2 ? 4 : 0,
              }}
            >
              {text1}
            </Text>
            {text2 && (
              <Text
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: "400",
                  lineHeight: 18,
                }}
              >
                {text2}
              </Text>
            )}
          </View>

          <View
            style={{
              width: 4,
              height: 40,
              borderRadius: 2,
              backgroundColor: "#3b82f6",
              opacity: 0.3,
            }}
          />
        </LinearGradient>
      </View>
    );
  },
};