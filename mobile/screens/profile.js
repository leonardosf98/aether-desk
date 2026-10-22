import { Alert } from "react-native";
import {
  Button,
  CompanyCard,
  Screen,
  ScreenHeader,
  UserSummary,
} from "../components";

function confirmLogout(onLogout) {
  Alert.alert("Sair", "Encerrar sessão?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Sair", style: "destructive", onPress: onLogout },
  ]);
}

export function ProfileScreen({ user, onLogout }) {
  return (
    <Screen>
      <ScreenHeader title="Conta" />
      <UserSummary user={user} />
      <CompanyCard />
      <Button
        title="Sair"
        variant="danger"
        onPress={() => confirmLogout(onLogout)}
        style={{ marginTop: 16 }}
      />
    </Screen>
  );
}
