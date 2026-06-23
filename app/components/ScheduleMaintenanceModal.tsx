import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

export type MaintenanceSchedule = {
  type: string;
  lastDoneKm: number;
  intervalKm: number;
  notes: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (log: MaintenanceSchedule) => void;
  initialValues?: MaintenanceSchedule;
};

export default function ScheduleMaintenanceModal({
  visible,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [type, setType] = useState("");
  const [intervalKm, setIntervalKm] = useState("");
  const [lastDoneKm, setLastDoneKm] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!type.trim() || !intervalKm || !lastDoneKm) return;

    onSubmit({
      type,
      lastDoneKm: parseInt(lastDoneKm, 10),
      intervalKm: parseInt(intervalKm, 10),
      notes,
    });

    // reset form for next time
    setType("");

    setLastDoneKm("");
    setIntervalKm("");
    setNotes("");
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setType(initialValues.type);
      setLastDoneKm(initialValues.lastDoneKm.toString());
      setIntervalKm(initialValues.intervalKm.toString());
      setNotes(initialValues.notes);
    } else {
      setType("");
      setLastDoneKm("");
      setIntervalKm("");
      setNotes("");
    }
  }, [initialValues]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.label}>
            {initialValues ? "Edit Maintenance" : "Schedule Maintenance"}
          </Text>
          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Type (e.g. Oil Change)"
          />

          <TextInput
            style={styles.input}
            value={lastDoneKm}
            onChangeText={setLastDoneKm}
            keyboardType="numeric"
            placeholder="Last done at (km) — e.g. 1500"
          />

          <TextInput
            style={styles.input}
            value={intervalKm}
            onChangeText={setIntervalKm}
            keyboardType="numeric"
            placeholder="Every (km) — e.g. 3000"
          />

          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes (optional)"
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheet: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: "#666",
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: "#B8001F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
