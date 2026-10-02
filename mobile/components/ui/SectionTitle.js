import { Text } from "react-native";
import { colors } from "../../theme";

export function SectionTitle({ children, style }) {
  return (
    <Text style={[{ fontWeight: "800", color: colors.text, marginBottom: 10 }, style]}>
      {children}
    </Text>
  );
}
