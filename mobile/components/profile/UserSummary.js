import { Text, View } from "react-native";
import { ROLE_LABEL, colors } from "../../theme";
import { Badge, Card, Muted } from "../../ui";
import { Logo } from "../common/Logo";

export function UserSummary({ user }) {
  return (
    <Card>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <Logo size={48} radius={24} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: colors.text }}>{user.name}</Text>
          <Muted style={{ marginTop: 4 }}>{user.email}</Muted>
        </View>
      </View>
      <View style={{ marginTop: 4 }}>
        <Badge label={ROLE_LABEL[user.role]} color={colors.primaryDark} bg={colors.primarySoft} />
      </View>
    </Card>
  );
}
