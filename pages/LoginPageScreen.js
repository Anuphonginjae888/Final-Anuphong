import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPageScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const nameToSave = username.trim() ? username : "Guest";
    await AsyncStorage.setItem("username", nameToSave);
    navigation.replace("HomePageScreen");
  };

  return (
    <LinearGradient
      colors={["#60a5fa", "#2563eb"]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center", width: "100%" }}
        >
          <View style={styles.card}>
            <Text style={styles.title}>เข้าสู่ระบบ</Text>
            <Text style={styles.subtitle}>กรอกชื่อผู้ใช้และรหัสผ่าน</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#9ca3af"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={{ width: "100%", marginTop: 20 }}
              onPress={handleLogin}
            >
              <LinearGradient
                colors={["#3b82f6", "#1e40af"]}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 15 }}>
              <Text style={styles.linkText}>ลืมรหัสผ่าน ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 10 }}>
              <Text style={styles.linkText}>
                ยังไม่มีบัญชี? <Text style={{ fontWeight: "700" }}>สมัครสมาชิก</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 15,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  linkText: {
    fontSize: 14,
    color: "#2563eb",
  },
});
