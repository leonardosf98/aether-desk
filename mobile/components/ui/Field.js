import { TextInput, View } from "react-native";
import { colors } from "../../theme";
import { FieldLabel } from "./FieldLabel";
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
      <FieldLabel>{label}</FieldLabel>
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
