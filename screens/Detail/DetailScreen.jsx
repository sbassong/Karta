import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window"); // for thee carousel

export default function DetailScreen({ route, navigation }) {
  // item data passed from MapScreen
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <ScrollView>
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {item.images.length > 0 && item.images.map((url, index) => (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
