import { Text, View } from "react-native";
import Header from "./components/Header";
import Card from "./components/Card";
import MaintenanceCard from "./components/MaintenanceCard";
import RecentActivities, { Activity } from "./components/RecentActivities";
import Fab from "./components/Fab";
import FabMenu from "./components/FabMenu";
import { useState, useEffect } from "react";
import UpdateOdometerModal from "./components/UpdateOdometerModal";
import LogMaintenanceModal, {
  MaintenanceLog,
} from "./components/LogMaintenanceModal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScheduleMaintenanceModal, {
  MaintenanceSchedule,
} from "./components/ScheduleMaintenanceModal";
import ScheduleListModal from "./components/ScheduleListModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  const [recentActivities, setRecentActivities] = useState<Activity[]>(
    ListOfRecentActivities,
  );

  const [scheduleListVisible, setScheduleListVisible] = useState(false);
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);

  // Load the items inside the storage and passed them on schedule state
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const stored = await AsyncStorage.getItem("maintenance_schedules");
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("Loaded schedules:", parsed);
          setSchedules(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load schedules", e);
      }
    };

    loadSchedules();
  }, []);

  return (
    <SafeAreaProvider
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
        openModal={() => setScheduleListVisible(true)}
      />

      <RecentActivities
        title="Recent Activities"
        activities={recentActivities}
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

          {
            id: "4",
            label: "Schedule Maintenance",
            icon: "build-outline",
            onPress: () => setScheduleModalVisible(true),
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
          const newActivity: Activity = {
            id: Date.now().toString(),
            label: log.type,
            date: new Date().toLocaleDateString(),
          };
          setRecentActivities((prev) => [newActivity, ...prev]);
        }}
      />

      <ScheduleMaintenanceModal
        visible={scheduleModalVisible}
        onClose={() => setScheduleModalVisible(false)}
        onSubmit={async (schedule) => {
          const updated = [...schedules, schedule];
          setSchedules(updated);

          try {
            await AsyncStorage.setItem(
              "maintenance_schedules",
              JSON.stringify(updated),
            );
          } catch (e) {
            console.error("Failed to save schedule", e);
          }

          setScheduleModalVisible(false);
        }}
      />

      <ScheduleListModal
        visible={scheduleListVisible}
        onClose={() => {
          setScheduleListVisible(false);
        }}
        schedules={schedules}
      />
    </SafeAreaProvider>
  );
}
