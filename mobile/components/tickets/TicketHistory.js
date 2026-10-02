import { Text, View } from "react-native";
import { colors } from "../../theme";
import { Muted } from "../../ui";
import { formatWhen } from "../../utils";
import { SectionTitle } from "../common/SectionTitle";

export function TicketHistory({ events }) {
  return (
    <>
      <SectionTitle style={{ marginTop: 20 }}>Histórico</SectionTitle>
      {(events || []).map((event) => (
        <View key={event.id} style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "700", color: colors.text }}>
            {event.actorName} · {event.type}
          </Text>
          <Muted>{formatWhen(event.createdAt)}</Muted>
        </View>
      ))}
    </>
  );
}
