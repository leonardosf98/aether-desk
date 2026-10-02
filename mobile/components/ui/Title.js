import { Text } from "react-native";
import { colors } from "../../theme";

export function Title({ children, style }) {
  return (
    <Text
      style={[
        { fontSize: 28, fontWeight: "800", color: colors.text, letterSpacing: -0.6 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
