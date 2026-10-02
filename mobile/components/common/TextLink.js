import { Pressable, Text } from "react-native";
import { colors } from "../../theme";

export function TextLink({ label, onPress, style }) {
  return (
    <Pressable
      /* prop blablabla */
      onPress={onPress}
    >
      <Text
        /* Prop usada para definir estilo */
        style={[{ color: colors.primary, fontWeight: "700" }, style]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
