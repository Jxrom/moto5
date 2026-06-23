import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  statusTitle: string;
  kmLeft: string;
  scheduleStatus?: string;
  openModal: () => void;
};

export default function MaintenanceCard({
  statusTitle,
  kmLeft,
  scheduleStatus,
  openModal,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{statusTitle}</Text>
      <Text style={styles.description}>{kmLeft}</Text>
      {/* <Text style={styles.scheduleStatus}>{scheduleStatus}</Text> */}

      <Pressable style={styles.viewScheduleBtn} onPress={openModal}>
        <Text style={{ color: "#fff" }}>View Scheduled Maintenance</Text>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={24}
          color="#B8001F"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
    elevation: 3,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#8f8c8c",
  },
  description: {
    fontSize: 18,
    color: "#666",
  },
  scheduleStatus: {
    fontSize: 15,
    color: "#666",
  },
  viewScheduleBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
