import { View } from "react-native";
import { Muted, Title } from "../../ui";

export function ScreenHeader({ title, subtitle, action, style }) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Title>{title}</Title>
        {action}
      </View>
      {subtitle ? <Muted style={{ marginTop: 6 }}>{subtitle}</Muted> : null}
    </View>
  );
}
