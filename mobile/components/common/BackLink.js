import { TextLink } from "./TextLink";

/*
  Link de voltar: só um texto clicável, mais leve que um Button.
  Pressable é o componente nativo que detecta o toque e chama onPress.
  Text também suporta onPress MAS por que usar Pressable?
  No text, só o texto suporta o click, o pressable meio que cria uma caixa para o texto,
  ai conseguimos clicar melhor (opinião minha)
*/
export function BackLink({ onPress, label = "Voltar" }) {
  return <TextLink label={label} onPress={onPress} style={{ marginBottom: 12 }} />;
}
