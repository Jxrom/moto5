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
  onDelete: (index: number) => void;
  onEdit: (schedule: MaintenanceSchedule, index: number) => void;
  currentOdo: number;
  onMarkDone: (index: number) => void;
};

export default function ScheduleListModal({
  visible,
  onClose,
  schedules,
  onDelete,
  onEdit,
  currentOdo,
  onMarkDone,
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
          renderItem={({ item, index }) => {
            const kmRemaining = item.lastDoneKm + item.intervalKm - currentOdo;
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.type}</Text>
                  <View style={styles.cardActions}>
                    <Pressable onPress={() => onEdit(item, index)}>
                      <Ionicons name="pencil-outline" size={20} color="#555" />
                    </Pressable>
                    <Pressable onPress={() => onDelete(index)}>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#B8001F"
                      />
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.cardDetail}>
                  Every {item.intervalKm} km
                </Text>
                <Text style={styles.cardDetail}>
                  Last done at {item.lastDoneKm} km
                </Text>
                <Text
                  style={[
                    styles.kmRemaining,
                    { color: kmRemaining <= 0 ? "#B8001F" : "#16a34a" },
                  ]}
                >
                  {kmRemaining <= 0
                    ? `${Math.abs(kmRemaining)} km overdue`
                    : `${kmRemaining} km remaining`}
                </Text>

                {item.notes ? (
                  <Text style={styles.cardNotes}>{item.notes}</Text>
                ) : null}

                <Pressable
                  onPress={() => onMarkDone(index)}
                  style={styles.markDoneBtn}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.markDoneText}>Mark as Done</Text>
                </Pressable>
              </View>
            );
          }}
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  kmRemaining: {
    fontSize: 13,
    fontWeight: "600",
  },
  markDoneBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#16a34a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  markDoneText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
