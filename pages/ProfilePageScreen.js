import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePageScreen({ navigation }) {
  const [displayName, setDisplayName] = useState("Guest");
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");

  // โหลดข้อมูลจาก AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const savedName = await AsyncStorage.getItem("username");
      if (savedName) {
        setDisplayName(savedName);
        setTempName(savedName);
      }

      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) setProfileImage(savedImage);
    };
    loadData();
  }, []);

  // ฟังก์ชันเลือกรูป
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("ต้องอนุญาตเข้าถึงรูปภาพก่อน");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("profileImage", uri);
    }
  };

  // ฟังก์ชันบันทึกชื่อใหม่
  const saveName = async () => {
    if (!tempName.trim()) {
      Alert.alert("กรุณากรอกชื่อผู้ใช้");
      return;
    }
    setDisplayName(tempName);
    await AsyncStorage.setItem("username", tempName);
    setEditing(false);
    Alert.alert("✅ บันทึกสำเร็จ", "ชื่อผู้ใช้ถูกอัปเดตแล้ว");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* รูปโปรไฟล์ */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: profileImage ? profileImage : "https://i.pravatar.cc/150",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.tip}>แตะที่รูปเพื่อเปลี่ยนรูปโปรไฟล์</Text>

        <Text style={styles.title}>โปรไฟล์ของคุณ</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>ชื่อผู้ใช้:</Text>

          {editing ? (
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              autoFocus
            />
          ) : (
            <Text style={styles.value}>{displayName}</Text>
          )}

          {/* ปุ่มแก้ไข/ยกเลิก */}
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: editing ? "#f87171" : "#2563eb" }]}
            onPress={() => setEditing(!editing)}
          >
            <Text style={styles.editText}>
              {editing ? "ยกเลิก" : "แก้ไข"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ปุ่มบันทึก (แสดงเฉพาะตอน editing) */}
        {editing && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#34d399" }]}
            onPress={saveName}
          >
            <Text style={styles.buttonText}>บันทึก</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#6b7280" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>ย้อนกลับ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#2563eb",
  },
  tip: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 30,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  editButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  editText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
