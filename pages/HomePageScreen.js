import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePageScreen({ navigation, route }) {
  const [displayName, setDisplayName] = useState("Guest");

  useEffect(() => {
    const loadName = async () => {
      if (route?.params?.name) {
        setDisplayName(route.params.name);
        await AsyncStorage.setItem("username", route.params.name);
      } else {
        const savedName = await AsyncStorage.getItem("username");
        if (savedName) setDisplayName(savedName);
      }
    };
    loadName();
  }, [route?.params?.name]);

  const greeting = getGreeting();

  return (
    <LinearGradient
      colors={["#93c5fd", "#3b82f6", "#1e40af"]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.greeting}>{greeting} 🌞</Text>
          <Text style={styles.name}>👋 {displayName}</Text>
          <Text style={styles.subtitle}>ยินดีต้อนรับเข้าสู่แอป</Text>

          {/* ปุ่ม Logout */}
          <TouchableOpacity
            style={{ width: "100%", marginTop: 15 }}
            onPress={async () => {
              await AsyncStorage.removeItem("username");
              navigation.navigate("LoginPage");
            }}
          >
            <LinearGradient
              colors={["#f87171", "#dc2626"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>ออกจากระบบ</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* ปุ่มไป ActivityPage */}
          <TouchableOpacity
            style={{ width: "100%", marginTop: 12 }}
            onPress={() => navigation.navigate("ActivityPage")}
          >
            <LinearGradient
              colors={["#34d399", "#059669"]}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>ไปหน้ากิจกรรม ➡️</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "สวัสดีตอนเช้า";
  if (h < 18) return "สวัสดีตอนบ่าย";
  return "สวัสดีตอนเย็น";
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  greeting: {
    fontSize: 22,
    color: "#2563eb",
    marginBottom: 8,
    fontWeight: "600",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
