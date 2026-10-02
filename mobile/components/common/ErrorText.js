import { Text } from "react-native";
import { colors } from "../../theme";

/*
  Texto de erro em vermelho. Só renderiza se houver children —
  mesmo esquema que fizemos no componente de estado vazio, só recebemos a mensagem
*/
export function ErrorText({ children }) {
  if (!children) return null;
  return (
    <Text
      /* uso do token de colors, facilidade de manutenção, ajusta num lugar, tudo que usa esse cara está ajustado */
      style={{ color: colors.danger, marginBottom: 12, fontWeight: "600" }}
    >
      {children}
    </Text>
  );
}
