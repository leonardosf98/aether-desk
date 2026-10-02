import { Text, View } from "react-native";
import { colors } from "../../theme";
import { Muted } from "../ui";

export function InfoRow({ label, value }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Muted>{label}</Muted>
      <Text style={{ fontWeight: "700", color: colors.text }}>{value}</Text>
    </View>
  );
}
