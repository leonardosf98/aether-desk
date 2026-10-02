import { useState } from "react";
import { Alert } from "react-native";
import {
  Button,
  Card,
  CompanyCard,
  Screen,
  ScreenHeader,
  SwitchRow,
  UserSummary,
} from "../components";

function confirmLogout(onLogout) {
  Alert.alert("Sair", "Encerrar sessão?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Sair", style: "destructive", onPress: onLogout },
  ]);
}

export function ProfileScreen({ user, onLogout }) {
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  return (
    <Screen>
      <ScreenHeader title="Conta" />
      <UserSummary user={user} />
      <CompanyCard />
      <Card style={{ marginTop: 12 }}>
        <SwitchRow
          title="Notificações"
          description="Receber alertas de novos chamados"
          value={notifyEnabled}
          onValueChange={setNotifyEnabled}
        />
      </Card>
      <Button
        title="Sair"
        variant="danger"
        onPress={() => confirmLogout(onLogout)}
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
