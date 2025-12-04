import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { WarmCommunityColors } from "../../utilities/theme";
import { Ionicons } from "@expo/vector-icons";
import ReportModal from "../../components/ReportModal/ReportModal";
import { addImageToPoi } from "../../helpers/addImage";

const { width: screenWidth } = Dimensions.get("window"); // for thee carousel
const Colors = WarmCommunityColors.light;

export default function DetailScreen({ route, navigation, user }) {
  const { item } = route.params; // item data passed from MapScreen

  const [modalVisible, setModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState(item?.images || []);
  const [message, setMessage] = useState("");

  const handleReportSubmit = async (reportData) => {
    console.log(" ")
    console.log("=> preparing to submit report")
    setModalVisible(false);

    const payload = {
      poiId: item._id,
      userId: user ? user.id : "CURRENT_USER_ID",
      status: reportData.status,
      note: reportData.note,
    };

    try {
      const response = await fetch(process.env.EXPO_PUBLIC_REPORTING_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json()

      if (response.ok) {
        console.log("report submitted ==>" ,data.report )
        setMessage(
          "Success: Report submitted, thank you for helping the community"
        );
      } else {
        setMessage("Error: Failed to submit report.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error: network issues");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  const handlePickImage = async () => {
    console.log(" ")
    console.log("=> opening picker")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    const asset = result.assets[0];

    let localUri = asset.uri;
    if (Platform.OS === "android" && !localUri.startsWith("file://")) {
      localUri = `file://${localUri}`;
    }

    const filename = localUri.split("/").pop() || "upload.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = asset.mimeType || (match ? `image/${match[1]}` : `image/jpeg`);

    const formData = new FormData();

    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
   console.log("=> sending image to service ");
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}`,
        {
          method: "POST",
          body: formData,
          headers: {}, // formdata content type is automatically sent
        }
      );
      
      const data = await response.json();

      if (response.ok) {
        const s3Url = data.url;
        s3Url && setMessage("Success: Image uploaded.");
        setCurrentImages([...currentImages, s3Url])
        console.log("returned s3Rrl from service ==> ", s3Url);
        const updatedPoi = await addImageToPoi(item._id, s3Url);
        console.log("Updated POI _id ==> ", updatedPoi?._id )
      } else {
        setMessage("Error: Upload failed.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      setMessage("Error: Could not reach upload service.");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handlePickImage()}>
        <Ionicons name="images" size={28} color={Colors.tint} />
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={styles.scrollView}
        >
          {currentImages?.length > 0 &&
            currentImages.map((url, index) => (
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
                message.split(":")[0] === "Success" ? "#09a404ff" : "#f80303ff",
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
