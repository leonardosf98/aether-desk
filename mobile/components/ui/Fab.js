import { Pressable, Text } from "react-native";
import { colors } from "../../theme";

export function Fab({ label = "+", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: colors.primaryDark,
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      <Text style={{ color: colors.onPrimary, fontSize: 30, fontWeight: "700", marginTop: -4 }}>
        {label}
      </Text>
    </Pressable>
  );
}
