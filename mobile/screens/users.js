import { FlatList } from "react-native";
import { Screen } from "../ui";
import { NewUserForm, ScreenHeader, UserCard } from "../components";

export function UsersScreen({ users, onCreate, onToggle, onRole, onDelete }) {
  return (
    <Screen>
      <ScreenHeader title="Usuários" subtitle="CRUD interno da operação." />
      <NewUserForm onCreate={onCreate} />
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UserCard user={item} onToggle={onToggle} onRole={onRole} onDelete={onDelete} />
        )}
        style={{ marginTop: 14 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </Screen>
  );
}
