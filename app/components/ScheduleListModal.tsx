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
import Toast from "./Toast";

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast(null);
    setTimeout(() => setToast({ message, type }), 50);
  };

  const handleTap = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={schedules}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            const kmRemaining = item.lastDoneKm + item.intervalKm - currentOdo;
            const isExpanded = expandedIndex === index; // 👈 add this

            return (
              <Pressable onPress={() => handleTap(index)}>
                <View style={[styles.card, isExpanded && styles.cardExpanded]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.type}</Text>

                    {/* 👇 only show actions when expanded */}
                    {isExpanded ? (
                      <View style={styles.cardActions}>
                        <Pressable
                          onPress={() => {
                            setExpandedIndex(null);
                            onEdit(item, index);
                            showToast("Editing schedule", "info");
                          }}
                        >
                          <Ionicons
                            name="pencil-outline"
                            size={20}
                            color="#555"
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setExpandedIndex(null);
                            onDelete(index);
                            showToast("Schedule deleted", "error");
                          }}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#B8001F"
                          />
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            setExpandedIndex(null);
                            onMarkDone(index);
                            showToast("Marked as done!", "success");
                          }}
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={24}
                            color="#008000"
                          />
                        </Pressable>
                      </View>
                    ) : (
                      <Ionicons name="chevron-forward" size={16} color="#aaa" />
                    )}
                  </View>

                  <Text style={styles.cardDetail}>
                    Every {item.intervalKm.toLocaleString()} km
                  </Text>
                  <Text style={styles.cardDetail}>
                    Last done at {item.lastDoneKm.toLocaleString()} km
                  </Text>
                  <Text
                    style={[
                      styles.kmRemaining,
                      { color: kmRemaining <= 0 ? "#B8001F" : "#16a34a" },
                    ]}
                  >
                    {kmRemaining <= 0
                      ? `${Math.abs(kmRemaining).toLocaleString()} km overdue`
                      : `${kmRemaining.toLocaleString()} km remaining`}
                  </Text>

                  {item.notes ? (
                    <Text style={styles.cardNotes}>{item.notes}</Text>
                  ) : null}
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.empty}>No schedules yet.</Text>
          }
        />

        {toast && (
          <Toast visible={!!toast} message={toast.message} type={toast.type} />
        )}
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
  cardExpanded: {
    borderWidth: 1,
    borderColor: "#B8001F", // matches your app's accent color
  },
});
