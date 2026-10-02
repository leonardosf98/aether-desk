import { View } from "react-native";
import { Chip, SectionTitle } from "../ui";

export function AssignAgent({ agents, agentId, onAssign }) {
  return (
    <>
      <SectionTitle>Atribuir atendente</SectionTitle>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Chip label="Ninguém" selected={!agentId} onPress={() => onAssign(null)} />
        {agents.map((agent) => (
          <Chip
            key={agent.id}
            label={agent.name}
            selected={agentId === agent.id}
            onPress={() => onAssign(agent.id)}
          />
        ))}
      </View>
    </>
  );
}
