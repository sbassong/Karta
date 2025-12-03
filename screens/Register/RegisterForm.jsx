import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton/BackButton";

export default function RegisterForm({ navigation, route }) {
  const { setUser } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");

  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        `${process.env.EXPO_PUBLIC_AUTH_BASE_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, username }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Success: Account successfully registed", responseData);
        setMessage("Success: Account successfully registed");
        setUser(responseData);
        navigation.replace("Map");
        setMessage("");
      } else {
        console.error("Error: Registration failed: ", responseData.error.msg);
        setMessage("Error: Registration failed.");
      }
    } catch (error) {
      console.error("Network error:", error.msg);
      setMessage("Server Error: Please try again later.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Join The Community!</Text>
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
        <TextInput
          placeholder="Confirm password"
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
              ...style.message,
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
      </View>
    </SafeAreaView>
  );
}
