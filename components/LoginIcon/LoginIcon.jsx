import { Ionicons } from "@expo/vector-icons";
import { WarmCommunityColors } from "../../utilities/theme";

const Colors = WarmCommunityColors.light;

export default function LoginIcon() {
  return <Ionicons name="log-in" size={32} color={Colors.tint} />;
}
