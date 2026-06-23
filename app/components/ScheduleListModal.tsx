import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
  Animated,
} from "react-native";
import { MaintenanceSchedule } from "./ScheduleMaintenanceModal";
import Toast from "./Toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

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
  const swipeableRefs = useRef<(Swipeable | null)[]>([]);

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

  const closeSwipeable = (index: number) => {
    swipeableRefs.current[index]?.close();
  };

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _drag: Animated.AnimatedInterpolation<number>,
    index: number,
    item: MaintenanceSchedule,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-160, 0],
    });

    return (
      <Animated.View
        style={[styles.actionsContainer, { transform: [{ translateX }] }]}
      >
        {/* Mark Done */}
        <Pressable
          style={[styles.actionBtn, styles.actionDone]}
          onPress={() => {
            closeSwipeable(index);
            onMarkDone(index);
            showToast("Marked as done!", "success");
          }}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.actionLabel}>Done</Text>
        </Pressable>

        {/* Edit */}
        <Pressable
          style={[styles.actionBtn, styles.actionEdit]}
          onPress={() => {
            closeSwipeable(index);
            onEdit(item, index);
            showToast("Editing schedule", "info");
          }}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
          <Text style={styles.actionLabel}>Edit</Text>
        </Pressable>

        {/* Delete */}
        <Pressable
          style={[styles.actionBtn, styles.actionDelete]}
          onPress={() => {
            closeSwipeable(index);
            onDelete(index);
            showToast("Schedule deleted", "error");
          }}
        >
          <Ionicons name="trash" size={18} color="#fff" />
          <Text style={styles.actionLabel}>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.label}>Scheduled Maintenance</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-circle-outline" size={30} color="#B8001F" />
            </Pressable>
          </View>

          <Text style={styles.hint}>Swipe right on a card to take action</Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={schedules}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const kmRemaining =
                item.lastDoneKm + item.intervalKm - currentOdo;

              return (
                <Swipeable
                  ref={(ref) => {
                    swipeableRefs.current[index] = ref;
                  }}
                  renderLeftActions={(progress, drag) =>
                    renderLeftActions(progress, drag, index, item)
                  }
                  leftThreshold={40}
                  friction={2}
                  overshootLeft={false}
                >
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{item.type}</Text>
                      <Ionicons
                        name="reorder-two-outline"
                        size={18}
                        color="#ccc"
                      />
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
                </Swipeable>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.empty}>No schedules yet.</Text>
            }
          />

          {toast && (
            <Toast
              visible={!!toast}
              message={toast.message}
              type={toast.type}
            />
          )}
        </View>
      </GestureHandlerRootView>
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
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
    marginBottom: 2,
  },
  kmRemaining: {
    fontSize: 13,
    fontWeight: "600",
  },
  // Swipe actions
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },
  actionBtn: {
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    height: "100%",
  },
  actionLabel: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  actionDone: {
    backgroundColor: "#16a34a",
  },
  actionEdit: {
    backgroundColor: "#555",
  },
  actionDelete: {
    backgroundColor: "#B8001F",
  },
});
