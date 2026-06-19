import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

export type MaintenanceLog = {
  type: string;
  km: string;
  notes: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (log: MaintenanceLog) => void;
};

export default function LogMaintenanceModal({
  visible,
  onClose,
  onSubmit,
}: Props) {
  const [type, setType] = useState("");
  const [km, setKm] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!type.trim()) return; // basic guard, refine later

    onSubmit({ type, km, notes });

    // reset form for next time
    setType("");
    setKm("");
    setNotes("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.label}>Log Maintenance</Text>

          <TextInput
            style={styles.input}
            value={type}
            onChangeText={setType}
            placeholder="Type (e.g. Oil Change)"
          />

          <TextInput
            style={styles.input}
            value={km}
            onChangeText={setKm}
            keyboardType="numeric"
            placeholder="Odometer at time of service (km)"
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
