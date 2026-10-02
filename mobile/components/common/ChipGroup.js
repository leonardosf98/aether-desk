import { Text, View } from "react-native";
import { colors } from "../../theme";
import { Chip } from "../../ui";

/*
  Grupo de chips com label: monta uma linha de Chip a partir de options [key, label].
  Centraliza a seleção visual (prioridade, status, papel) sem repetir o map em cada tela.

  Exemplo de uso na chamada:

    PRIORITY_META = export const PRIORITY_META = {
      baixa: { label: "Baixa", color: "#64748B" },
      media: { label: "Média", color: "#1D4ED8" },
      alta: { label: "Alta", color: "#C2410C" },
      urgente: { label: "Urgente", color: "#BE123C" },
    };

    <ChipGroup
      label="Prioridade"
      options={Object.entries(PRIORITY_META).map(([k, v]) => [k, v.label])}
      value={priority}
      onChange={setPriority}
    />

  View serve pra renderizar algo literalmente um container que suporta estilo (me lembrou uma div),
  podemos usar assim com estilo inline ou com StyleSheet.create para ficar separado da linha

  Grande ganho dessa tela, toda vez que criarmos um grupo de chips,
  só passamos as opções aqui com valor e título a ser exibido e
  tudo fica certinho, usamos somente 1 map
*/
export function ChipGroup({ label, options, value, onChange }) {
  return (
    <>
      <Text style={{ color: colors.muted, marginBottom: 8 }}>{label}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map(([key, optionLabel]) => (
          <Chip
            key={key}
            label={optionLabel}
            selected={value === key}
            onPress={() => onChange(key)}
          />
        ))}
      </View>
    </>
  );
}
