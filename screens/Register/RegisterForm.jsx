import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import usePushNotifications from "../../hooks/usePushNotifications";

export default function RegisterForm({ navigation, route, setUser }) {
  const { registerToken, sendNotification } = usePushNotifications();
  const inputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(" ");
    console.log("=> Registering account now");

    if (!email || !password || !confirm || !username) {
      setMessage("Error: Missing fields.");
      return;
    }
    if (password !== confirm) return setMessage("Error: Password mismatch.");

    if (inputRef.current) {
      inputRef.current.blur();
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_AUTH_BASE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, username }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        const notificationData = {
          userId: responseData?.id,
          event: "WELCOME_MESSAGE",
          data: {
            name: responseData?.username,
          },
        };
        console.log("Success: Account successfully registed", responseData);
        
        setMessage("Success: Account successfully registed");
        setUser(responseData);
        console.log(" => Registering user device");
        await registerToken(responseData?.id);
        setMessage("");
        console.log(" ")
        console.log("=> sending welcome notification to registered user ")
        await sendNotification(notificationData);
        navigation.replace("Map");
      } else {
        console.error("Error: Registration failed: ", responseData.error.msg);
        setMessage("Error: Registration failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Error: Network issues. please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Join The Community!</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#6D6A62"
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
          placeholderTextColor="#6D6A62"
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
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#6D6A62"
          value={confirm}
          onChangeText={(value) => {
            message && setMessage("");
            setConfirm(value);
          }}
          ref={inputRef}
          autoCapitalize="none"
          keyboardType="password"
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#6D6A62"
          value={username}
          onChangeText={(value) => {
            setMessage("");
            setUsername(value);
          }}
          ref={inputRef}
          autoCapitalize="none"
          keyboardType="text"
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
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>already a member? Log back in!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
