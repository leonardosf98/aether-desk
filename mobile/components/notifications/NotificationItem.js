import { Pressable, Text } from "react-native";
import { colors } from "../../theme";
import { Card, Muted } from "../ui";
import { formatWhen } from "../../utils";

export function NotificationItem({ item, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "800", color: colors.text }}>{item.ticketTitle}</Text>
        <Muted style={{ marginTop: 4 }}>
          {item.actorName} · {item.type} · {formatWhen(item.createdAt)}
        </Muted>
      </Card>
    </Pressable>
  );
}
