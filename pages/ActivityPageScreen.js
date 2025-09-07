import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function ActivityPageScreen({ navigation }) {
  const [username, setUsername] = useState("Guest");
  const [activities, setActivities] = useState([
    { id: "1", title: "วิ่งเช้า 5 กม.", date: "07/09/2025" },
    { id: "2", title: "อ่านหนังสือ 1 ชั่วโมง", date: "07/09/2025" },
    { id: "3", title: "ทำงานโปรเจกต์ React Native", date: "07/09/2025" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  // โหลด username ทุกครั้งที่โฟกัสหน้านี้
  useFocusEffect(
    useCallback(() => {
      const loadUsername = async () => {
        const savedName = await AsyncStorage.getItem("username");
        if (savedName) {
          setUsername(savedName);
        } else {
          setUsername("Guest");
        }
      };
      loadUsername();
    }, [])
  );

  const addActivity = () => {
    if (!newActivity.trim()) return;
    setActivities([
      ...activities,
      {
        id: (activities.length + 1).toString(),
        title: newActivity,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setNewActivity("");
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>✅ {item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#bfdbfe", "#3b82f6", "#1e40af"]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>กิจกรรมของ {username}</Text>

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Floating Bottom Bar */}
        <View style={styles.bottomBar}>
          {/* Profile */}
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate("ProfilePage")}
          >
            <Text style={styles.buttonText}>👤 Profile</Text>
          </TouchableOpacity>

          {/* Add */}
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>➕ Add</Text>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate("SettingsPage")}
          >
            <Text style={styles.buttonText}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Modal เพิ่มกิจกรรม */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>เพิ่มกิจกรรมใหม่</Text>
              <TextInput
                style={styles.input}
                placeholder="ชื่อกิจกรรม"
                value={newActivity}
                onChangeText={setNewActivity}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={addActivity}>
                  <LinearGradient
                    colors={["#34d399", "#059669"]}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>เพิ่ม</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, marginHorizontal: 5 }} onPress={() => setModalVisible(false)}>
                  <LinearGradient
                    colors={["#f87171", "#dc2626"]}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>ยกเลิก</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111827" },
  date: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600", color: "#1e3a8a" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1e3a8a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
