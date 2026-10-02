import { Text, TextInput, View } from "react-native";
import { colors } from "../../theme";
import { inputBox } from "./inputBox";

export function Field({
  label,
  value,
  onChangeText,
  secure,
  placeholder,
  multiline,
  ...inputProps
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        returnKeyType={multiline ? "default" : "done"}
        blurOnSubmit={!multiline}
        style={[
          inputBox,
          {
            paddingHorizontal: 14,
            paddingVertical: 12,
            minHeight: multiline ? 110 : 48,
            color: colors.text,
            fontSize: 16,
          },
        ]}
        {...inputProps}
      />
    </View>
  );
}
