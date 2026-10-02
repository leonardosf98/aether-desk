import { Pressable, Text, View } from "react-native";
import { CATEGORY_LABEL, PRIORITY_META, STATUS_META, colors } from "../../theme";
import { Badge, Card, Muted } from "../../ui";
import { formatWhen } from "../../utils";

export function TicketCard({ ticket, onPress }) {
  const status = STATUS_META[ticket.status] || STATUS_META.aberto;
  const priority = PRIORITY_META[ticket.priority] || PRIORITY_META.media;
  return (
    <Pressable onPress={onPress}>
      <Card style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Badge label={status.label} color={status.color} bg={status.bg} />
          <Text style={{ color: priority.color, fontWeight: "800", fontSize: 12 }}>
            {priority.label}
          </Text>
        </View>
        <Text style={{ fontSize: 17, fontWeight: "800", color: colors.text }}>{ticket.title}</Text>
        <Muted style={{ marginTop: 6 }} numberOfLines={2}>
          {ticket.description}
        </Muted>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <Muted>{CATEGORY_LABEL[ticket.category] || ticket.category}</Muted>
          <Muted>{formatWhen(ticket.createdAt)}</Muted>
        </View>
        {ticket.agentName ? (
          <Muted style={{ marginTop: 6 }}>Atendente: {ticket.agentName}</Muted>
        ) : null}
      </Card>
    </Pressable>
  );
}
