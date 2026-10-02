import { Card } from "../../ui";
import { InfoRow } from "../common/InfoRow";

export function TicketPeople({ ticket }) {
  return (
    <Card style={{ marginTop: 16 }}>
      <InfoRow label="Cliente" value={ticket.clientName} />
      <InfoRow label="Atendente" value={ticket.agentName || "Não atribuído"} />
    </Card>
  );
}
