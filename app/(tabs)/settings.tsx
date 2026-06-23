// app/(tabs)/settings.tsx
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const restoreApp = async () => {
    try {
      await AsyncStorage.removeItem("maintenance_schedules");
      await AsyncStorage.removeItem("odometer");
      Alert.alert("Restored", "Schedules have been reset to defaults.");
    } catch (e) {
      console.error("Failed to restore app.");
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <Pressable onPress={restoreApp} style={styles.btn}>
        <Text style={styles.btnText}>Restore Defaults</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 32,
  },
  btn: {
    backgroundColor: "#B8001F",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
