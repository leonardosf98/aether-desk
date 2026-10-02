import { Switch, Text, View } from "react-native";
import { colors } from "../../theme";
import { Muted } from "../../ui";

export function SwitchRow({ title, description, value, onValueChange }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "700", color: colors.text }}>{title}</Text>
        {description ? <Muted>{description}</Muted> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.line, true: colors.primarySoft }}
        thumbColor={value ? colors.primary : colors.switchThumbOff}
      />
    </View>
  );
}
