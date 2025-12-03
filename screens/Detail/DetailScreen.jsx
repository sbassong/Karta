import React, { useState } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window"); // for thee carousel

export default function DetailScreen({ route, navigation, user }) {
  // item data passed from MapScreen
  const { item } = route.params;

  const [status, setStatus] = useState("")
  const [note, setNote] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
