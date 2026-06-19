import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  description: string;
};

export default function Card({ title, description }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <MaterialCommunityIcons name="motorbike" size={80} color="#B8001F" />
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#666",
  },
});
