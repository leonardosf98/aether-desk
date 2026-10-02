import { ActivityIndicator, Pressable, Text } from "react-native";
import { colors } from "../../theme";

export function Button({ title, onPress, variant = "primary", disabled, loading, style }) {
  const map = {
    primary: { bg: colors.primary, color: colors.onPrimary },
    ghost: { bg: colors.primarySoft, color: colors.primaryDark },
    danger: { bg: colors.dangerSoft, color: colors.danger },
  };
  const tone = map[variant] || map.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: tone.bg,
          borderRadius: 16,
          minHeight: 50,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          paddingHorizontal: 16,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={tone.color} />
      ) : (
        <Text style={{ color: tone.color, fontWeight: "800", fontSize: 15 }}>{title}</Text>
      )}
    </Pressable>
  );
}
