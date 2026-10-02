import { FlatList } from "react-native";
import { EmptyState, NotificationItem, Screen, ScreenHeader, TextLink } from "../components";

export function NotificationsScreen({ items, onOpen, onMarkSeen }) {
  return (
    <Screen>
      <ScreenHeader
        title="Fila ao vivo"
        subtitle="Novos pedidos e mudanças de status entram aqui."
        action={<TextLink label="Limpar" onPress={onMarkSeen} />}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <NotificationItem item={item} onPress={() => onOpen(item)} />}
        ListEmptyComponent={<EmptyState>Nenhuma notificação nova.</EmptyState>}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
