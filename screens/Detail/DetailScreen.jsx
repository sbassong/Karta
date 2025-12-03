import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { WarmCommunityColors } from "../../utilities/theme";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window"); // for thee carousel
const Colors = WarmCommunityColors.light;

export default function DetailScreen({ route, navigation, user }) {
  // item data passed from MapScreen
  const { item } = route.params;

  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState("")
  const [note, setNote] = useState("")

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images, // Or .All, .Videos
      allowsEditing: true, // Allow user to crop/edit the image
      aspect: [4, 3], // Define aspect ratio for editing
      quality: 1, // Image quality (0-1)
    });

    if (!result.canceled) {
      // Handle the selected image (e.g., display it, upload it)
      console.log(result.assets[0].uri); // URI of the selected image
      // setImage(result.assets[0].uri); // Example: Store the URI in state
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          {/* <View>
            {user?.id ? (
              <Pressable onPress={}>
                <Text style={styles.link}>Report an issue</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Log in to upload an image or leave a report</Text>
              </Pressable>
            )}
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
