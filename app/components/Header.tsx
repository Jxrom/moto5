import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // your styles here
  },
  title: {
    // your styles here
    fontWeight: "600",
    fontSize: 28,
    color: "#B8001F",
  },
});
