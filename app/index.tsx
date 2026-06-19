import { Text, View } from "react-native";
import Header from "./components/Header";
import Card from "./components/Card";
import MaintenanceCard from "./components/MaintenanceCard";
import RecentActivities, { Activity } from "./components/RecentActivities";
import Fab from "./components/Fab";

const ListOfRecentActivities: Activity[] = [
  { id: "1", label: "Oil Change", date: "May 12" },
  { id: "2", label: "Chain Lube", date: "May 20" },
  { id: "3", label: "Tire Check", date: "June 1" },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        padding: 6,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Header title="Good Morning" />

      <Card title="PCX 160" description="2500 km" />

      <MaintenanceCard
        statusTitle="Oil Change"
        kmLeft="1,200 km remaining"
        scheduleStatus="On Time"
      />

      <RecentActivities
        title="Recent Activities"
        activities={ListOfRecentActivities}
      />

      <Fab onPress={() => console.log("FAB pressed")} />
    </View>
  );
}
