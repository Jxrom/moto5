import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { MaintenanceSchedule } from "./ScheduleMaintenanceModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  schedules: MaintenanceSchedule[];
};

export default function ScheduleListModal({
  visible,
  onClose,
  schedules,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.label}>Scheduled Maintenance</Text>

          <Pressable onPress={onClose}>
            <Ionicons name="close-circle-outline" size={30} color="#B8001F" />
          </Pressable>
        </View>

        <FlatList
          data={schedules}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.type}</Text>
              <Text style={styles.cardDetail}>Every {item.intervalKm} km</Text>
              {item.notes ? (
                <Text style={styles.cardNotes}>{item.notes}</Text>
              ) : null}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No schedules yet.</Text>
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  cardDetail: {
    fontSize: 14,
    color: "#555",
  },
  cardNotes: {
    fontSize: 13,
    color: "#888",
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 15,
  },
});
