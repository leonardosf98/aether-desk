import { Text } from "react-native";
import { colors } from "../../theme";

export function FieldLabel({ children, style }) {
  return (
    <Text style={[{ color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6 }, style]}>
      {children}
    </Text>
  );
}
