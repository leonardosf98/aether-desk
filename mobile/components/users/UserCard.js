import { Text, View } from "react-native";
import { ROLE_LABEL, colors } from "../../theme";
import { Button, Card, Chip, Muted } from "../ui";

export function UserCard({ user, onToggle, onRole, onDelete }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: "800", color: colors.text }}>{user.name}</Text>
      <Muted>{user.email}</Muted>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {Object.keys(ROLE_LABEL).map((key) => (
          <Chip
            key={key}
            label={ROLE_LABEL[key]}
            selected={user.role === key}
            onPress={() => onRole(user, key)}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
        <Button
          title={user.active ? "Desativar" : "Ativar"}
          variant="ghost"
          onPress={() => onToggle(user)}
          style={{ flex: 1 }}
        />
        <Button title="Remover" variant="danger" onPress={() => onDelete(user)} style={{ flex: 1 }} />
      </View>
    </Card>
  );
}
