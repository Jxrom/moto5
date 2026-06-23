// components/Toast.tsx
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "info";

type Props = {
  visible: boolean;
  message: string;
  type?: ToastType;
};

const ICONS: Record<ToastType, string> = {
  success: "checkmark-circle-outline",
  error: "close-circle-outline",
  info: "information-circle-outline",
};

const COLORS: Record<ToastType, string> = {
  success: "#16a34a",
  error: "#B8001F",
  info: "#2563EB",
};

export default function Toast({ visible, message, type = "success" }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, message]);

  return (
    <Animated.View
      style={[styles.container, { opacity, borderLeftColor: COLORS[type] }]}
    >
      <Ionicons name={ICONS[type] as any} size={25} color={COLORS[type]} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderLeftWidth: 4,
    zIndex: 1500,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
});
