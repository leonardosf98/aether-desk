import { Pressable, Text, View } from "react-native";
import { colors } from "../../theme";

/*
  Barra de segmentos estilo iOS: options [key, label], um segmento selecionado por vez.
  Reduz o empilhamento de chips no topo das listas (situação em 1 linha só).
*/
export function Segmented({ options, value, onChange }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.bgSoft,
        borderRadius: 12,
        padding: 3,
      }}
    >
      {options.map(([key, label]) => {
        const selected = value === key;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            style={{
              flex: 1,
              paddingVertical: 9,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: selected ? colors.primary : "transparent",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: selected ? colors.onPrimary : colors.muted,
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
