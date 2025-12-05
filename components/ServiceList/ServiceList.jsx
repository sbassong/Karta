import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

const getIcon = (type) => {
  if (type === "Health") {
    return <FontAwesome5 name="clinic-medical" size={22} color="#D9534F" />;
  }
  if (type === "Water") {
    return <Ionicons name="water" size={22} color="#0275D8" />;
  }
  return <Ionicons name="location-sharp" size={22} color={Colors.icon} />;
};

export default function ServiceList({ data, onSelectItem }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nearby Services</Text>
      {data?.length > 0 && data.map((poi) => (
        <TouchableOpacity
          key={poi._id}
          style={styles.itemContainer}
          onPress={() => onSelectItem(poi)}
        >
          <View style={styles.iconContainer}>{getIcon(poi.type)}</View>
          <Text style={styles.itemText}>{poi.name}</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.icon} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
