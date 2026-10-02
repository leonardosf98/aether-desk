import { Text } from "react-native";
import { colors } from "../../theme";
import { Card } from "../ui";

/*
  Estado vazio: Card com texto em negrito via children.
  Mostra "nenhum resultado" sem parecer erro de rede ou falha de carregamento.

  CHILDREN:
    Tudo que fica entre as tags do componente, pode ser escrito de algumas formas, é uma prop
      texto normal: ListEmptyComponent={<EmptyState>Nenhuma notificação nova.</EmptyState>}
      explicitando a prop: ListEmptyComponent={<EmptyState children="Nenhuma notificação nova."}
      passando um componente: <Card children={<Title children="Oi" />} />
*/
export function EmptyState({ children }) {
  return (
    <Card>
      <Text style={{ fontWeight: "700", color: colors.text }}>{children}</Text>
    </Card>
  );
}
