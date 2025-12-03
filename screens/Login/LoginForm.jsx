import { useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton/BackButton";
import { styles } from "./styles";

export default function LoginForm({ navigation, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Error: Missing fields.");
      return;
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_AUTH_BASE_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Success: Logged in!", responseData);
        setMessage("Success: Logged in!");
        await SecureStore.setItemAsync("userToken", responseData?.token);
        setUser(responseData.user);
        navigation.replace("Map");
        setMessage("");
      } else {
        console.error("Error: Login failed: ", responseData.error);
        setMessage("Error: Login failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Server Error: Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View>
        <Text style={styles.title}>See what's new in the community!</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            message && setMessage("");
            setEmail(value);
          }}
          ref={inputRef}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => {
            message && setMessage("");
            setPassword(value);
          }}
          ref={inputRef}
          autoCapitalize="none"
          keyboardType="password"
          style={styles.input}
        />
        {message && (
          <Text
            style={{
              ...styles.message,
              color:
                message.split(":")[0] === "Success" ? "#09a404ff" : "#f80303ff",
            }}
          >
            {message}
          </Text>
        )}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}