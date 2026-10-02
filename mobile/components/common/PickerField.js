import { Picker } from "@react-native-picker/picker";
import { Platform, View } from "react-native";
import { colors } from "../../theme";
import { FieldLabel, inputBox } from "../ui";

const IOS_WHEEL_HEIGHT = 120;
const isIOS = Platform.OS === "ios";
const pickerHeight = isIOS ? IOS_WHEEL_HEIGHT : 48;

export function PickerField({ label, options, value, onChange }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <FieldLabel>{label}</FieldLabel>
      <View style={[inputBox, { height: pickerHeight, overflow: "hidden", justifyContent: "center" }]}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ height: pickerHeight, color: colors.text }}
          itemStyle={{ height: IOS_WHEEL_HEIGHT, fontSize: 16, color: colors.text }}
        >
          {options.map(([key, optionLabel]) => (
            <Picker.Item key={key} label={optionLabel} value={key} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
