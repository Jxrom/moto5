import { View, Text, StyleSheet, FlatList } from "react-native";

export type Activity = {
  id: string;
  label: string;
  date: string;
};

type Props = {
  title: string;
  activities: Activity[];
};

export default function RecentActivities({ title, activities }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
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
    backgroundColor: "#ffffff",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});
