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
import { DEFAULT_SCHEDULES } from "../constants/defaultSchedules";
import Toast from "./components/Toast";

const ListOfRecentActivities: Activity[] = [
  { id: "1", label: "Oil Change", date: "May 12" },
  { id: "2", label: "Chain Lube", date: "May 20" },
  { id: "3", label: "Tire Check", date: "June 1" },
];

export default function Index() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [odoMeter, setOdometer] = useState<number>(0);
  const [odometerModalVisible, setOdometerModalVisible] = useState(false);

  const [logModalVisible, setLogModalVisible] = useState(false);

  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  const [recentActivities, setRecentActivities] = useState<Activity[]>(
    ListOfRecentActivities,
  );

  const [scheduleListVisible, setScheduleListVisible] = useState(false);
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<{
    schedule: MaintenanceSchedule;
    index: number;
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast(null); // reset first so re-triggering works
    setTimeout(() => setToast({ message, type }), 50);
  };

  const markScheduleDone = async (index: number) => {
    const updatedList = schedules.map((s, i) =>
      i === index ? { ...s, lastDoneKm: odoMeter } : s,
    );
    setSchedules(updatedList);
    try {
      await AsyncStorage.setItem(
        "maintenance_schedules",
        JSON.stringify(updatedList),
      );

      showToast("Marked as done!", "success");
    } catch (e) {
      showToast("Something went wrong", "error");
      console.error("Failed to mark schedule as done", e);
    }
  };

  const updateSchedule = async (
    updated: MaintenanceSchedule,
    index: number,
  ) => {
    const normalized = {
      ...updated,
      lastDoneKm: Number(updated.lastDoneKm),
      intervalKm: Number(updated.intervalKm),
    };
    const updatedList = schedules.map((s, i) => (i === index ? normalized : s));
    setSchedules(updatedList);
    try {
      await AsyncStorage.setItem(
        "maintenance_schedules",
        JSON.stringify(updatedList),
      );
      showToast("Schedule updated", "info");
    } catch (e) {
      showToast("Something went wrong", "error");
      console.error("Failed to update schedule", e);
    }
  };

  const deleteSchedule = async (index: number) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
    try {
      await AsyncStorage.setItem(
        "maintenance_schedules",
        JSON.stringify(updated),
      );

      showToast("Schedule deleted", "error");
    } catch (e) {
      showToast("Something went wrong", "error");
      console.error("Failed to delete schedule", e);
    }
  };

  const nextSchedule = schedules
    .map((s) => ({
      ...s,
      kmRemaining: s.lastDoneKm + s.intervalKm - odoMeter,
    }))
    .sort((a, b) => a.kmRemaining - b.kmRemaining)[0];

  const updateOdometer = async (newKm: number) => {
    setOdometer(newKm);

    try {
      await AsyncStorage.setItem("odometer", newKm.toString());

      showToast("Odometer updated", "info");
    } catch (e) {
      console.error("Failed to save odometer", e);
    }
  };
  // Load the items inside the storage and passed them on schedule state
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const stored = await AsyncStorage.getItem("maintenance_schedules");
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("Loaded schedules:", parsed);
          setSchedules(JSON.parse(stored));
        } else {
          await AsyncStorage.setItem(
            "maintenance_schedules",
            JSON.stringify(DEFAULT_SCHEDULES),
          );
          setSchedules(DEFAULT_SCHEDULES);
        }
      } catch (e) {
        console.error("Failed to load schedules", e);
      }
    };

    loadSchedules();
  }, []);

  useEffect(() => {
    const loadOdometer = async () => {
      try {
        const stored = await AsyncStorage.getItem("odometer");
        if (stored !== null) {
          setOdometer(parseInt(stored, 10));
        } else {
          setOdometer(2500);
        }
      } catch (e) {
        console.error("Failed to load odometer", e);
      }
    };

    loadOdometer();
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

      <Card
        title="PCX 160"
        description={`${odoMeter} km`}
        openModal={() => {
          setOdometerModalVisible(true);
        }}
      />

      <MaintenanceCard
        statusTitle={nextSchedule?.type ?? "No schedule yet"}
        kmLeft={
          nextSchedule
            ? `${nextSchedule.kmRemaining.toLocaleString()} km remaining`
            : "—"
        }
        scheduleStatus={
          nextSchedule
            ? nextSchedule.kmRemaining <= 0
              ? "Overdue"
              : "On Time"
            : "—"
        }
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
        onSubmit={(newKm) => updateOdometer(newKm)}
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
        onClose={() => {
          setScheduleModalVisible(false);
          setEditingSchedule(null); // reset editing state on close
        }}
        initialValues={editingSchedule?.schedule}
        onSubmit={async (schedule) => {
          const normalized = {
            ...schedule,
            lastDoneKm: Number(schedule.lastDoneKm),
            intervalKm: Number(schedule.intervalKm),
          };

          if (editingSchedule !== null) {
            await updateSchedule(normalized, editingSchedule.index);
            setEditingSchedule(null);
          } else {
            const updated = [...schedules, normalized];
            setSchedules(updated);
            try {
              await AsyncStorage.setItem(
                "maintenance_schedules",
                JSON.stringify(updated),
              );
            } catch (e) {
              console.error("Failed to save schedule", e);
            }
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
        onDelete={deleteSchedule}
        onEdit={(schedule, index) => {
          setEditingSchedule({ schedule, index });
          setScheduleModalVisible(true);
        }}
        currentOdo={odoMeter}
        onMarkDone={markScheduleDone}
      />

      {toast && (
        <Toast visible={!!toast} message={toast.message} type={toast.type} />
      )}
    </SafeAreaProvider>
  );
}
