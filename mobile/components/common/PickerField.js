import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { colors } from "../../theme";
import { inputBox } from "../../ui";

export function PickerField({ label, options, value, onChange }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700", marginBottom: 6 }}>
        {label}
      </Text>
      <View style={inputBox}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ height: 48, color: colors.text }}
        >
          {options.map(([key, optionLabel]) => (
            <Picker.Item key={key} label={optionLabel} value={key} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
