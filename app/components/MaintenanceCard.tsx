import { View, Text, StyleSheet } from "react-native";

type Props = {
  statusTitle: string;
  kmLeft: string;
  scheduleStatus?: string;
};

export default function MaintenanceCard({
  statusTitle,
  kmLeft,
  scheduleStatus,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{statusTitle}</Text>
      <Text style={styles.description}>{kmLeft}</Text>
      <Text style={styles.scheduleStatus}>{scheduleStatus}</Text>
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
    gap: 10,
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
});
