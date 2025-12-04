import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { WarmCommunityColors } from "../../utilities/theme";
import { Ionicons } from "@expo/vector-icons";
import ReportModal from "../../components/ReportModal/ReportModal";

const { width: screenWidth } = Dimensions.get("window"); // for thee carousel
const Colors = WarmCommunityColors.light;

export default function DetailScreen({ route, navigation, user }) {
  // item data passed from MapScreen
  const { item } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleReportSubmit = async (reportData) => {
    setModalVisible(false);

    const payload = {
      poiId: item.id,
      userId: "CURRENT_USER_ID",
      status: reportData.status,
      note: reportData.note,
    };

    console.log("Submitting Report:", payload);

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_REPORTING_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(
          "Success: Report submitted, thank you for helping the community"
        );
        setMessage(
          "Success: Report submitted, thank you for helping the community"
        );
      } else {
        console.log("Error: Failed to submit report.");
        setMessage("Error: Failed to submit report.");
      }

      setTimeout(() => {
        setMessage("")
      }, 1500)
    } catch (err) {
      console.error(err);
      setMessage("Error: network issues");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      // setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Ionicons name="images" size={28} color={Colors.tint} />
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {item.images.length > 0 &&
            item.images.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={[styles.image, { width: screenWidth }]}
              />
            ))}
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>Type: {item.type}</Text>
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-sharp"
            size={20}
            color={styles.locationIcon.color}
          />
          <Text style={styles.locationName}>{item.locationName}</Text>
        </View>
        {message && (
          <Text
            style={{
              ...styles.message,
              color:
                message.split(":")[0] === "Success"
                  ? "#09a404ff"
                  : "#f80303ff",
            }}
          >
            {message}
          </Text>
        )}
        <Pressable
          style={styles.reportButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.reportButtonText}>Report an Issue</Text>
        </Pressable>

        <ReportModal
          visible={modalVisible}
          poiName={item.name}
          onClose={() => setModalVisible(false)}
          onSubmit={handleReportSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
