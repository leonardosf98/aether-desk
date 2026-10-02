import { Text } from "react-native";
import { colors } from "../../theme";

export function Muted({ children, style, ...rest }) {
  return (
    <Text style={[{ color: colors.muted, fontSize: 14, lineHeight: 20 }, style]} {...rest}>
      {children}
    </Text>
  );
}
