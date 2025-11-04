import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

// renders the icon based on the type
const Icon = ({ type }) => {
  if (type === "Health") {
    return <FontAwesome5 name="clinic-medical" size={30} color="#D9534F" />;
  }
  if (type === "Water") {
    return <Ionicons name="water" size={30} color="#0275D8" />;
  }
  return <Ionicons name="location-sharp" size={30} color={Colors.icon} />;
};

// needed to prevent flickering
export const CustomMarkerIcon = React.memo(Icon);
