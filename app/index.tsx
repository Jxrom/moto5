import { Text, View } from "react-native";
import Header from "./components/Header";
import Card from "./components/Card";
import MaintenanceCard from "./components/MaintenanceCard";
import RecentActivities, { Activity } from "./components/RecentActivities";
import Fab from "./components/Fab";
import FabMenu from "./components/FabMenu";
import { useState } from "react";
import UpdateOdometerModal from "./components/UpdateOdometerModal";
import LogMaintenanceModal, {
  MaintenanceLog,
} from "./components/LogMaintenanceModal";

const ListOfRecentActivities: Activity[] = [
  { id: "1", label: "Oil Change", date: "May 12" },
  { id: "2", label: "Chain Lube", date: "May 20" },
  { id: "3", label: "Tire Check", date: "June 1" },
];

export default function Index() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [odoMeter, setOdometer] = useState(2500);
  const [odometerModalVisible, setOdometerModalVisible] = useState(false);

  const [logModalVisible, setLogModalVisible] = useState(false);

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

      <Card title="PCX 160" description={`${odoMeter} km`} />

      <MaintenanceCard
        statusTitle="Oil Change"
        kmLeft="1,200 km remaining"
        scheduleStatus="On Time"
      />

      <RecentActivities
        title="Recent Activities"
        activities={ListOfRecentActivities}
      />

      <Fab onPress={() => setMenuVisible(true)} />

      <FabMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        options={[
          {
            id: "1",
            label: "Log Maintenance",
            icon: "build-outline",
            onPress: () => setLogModalVisible(true),
          },
          {
            id: "2",
            label: "Add Fuel",
            icon: "list-outline",
            onPress: () => console.log("Add Activity"),
          },
          {
            id: "3",
            label: "Update odometer",
            icon: "speedometer-outline",
            onPress: () => setOdometerModalVisible(true),
          },
        ]}
      />

      <UpdateOdometerModal
        visible={odometerModalVisible}
        currentKm={odoMeter}
        onClose={() => setOdometerModalVisible(false)}
        onSubmit={(newKm) => setOdometer(newKm)}
      />

      <LogMaintenanceModal
        visible={logModalVisible}
        onClose={() => setLogModalVisible(false)}
        onSubmit={(log: MaintenanceLog) => {
          console.log("New maintenance log: ", log);
        }}
      />
    </View>
  );
}
