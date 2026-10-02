import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { colors } from "../../theme";

const SCREEN_PAD_X = 24;
const SCREEN_PAD_TOP =
  Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 16 : Platform.OS === "web" ? 28 : 56;

export function Screen({ children, style }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.bg,
            paddingHorizontal: SCREEN_PAD_X,
            paddingTop: SCREEN_PAD_TOP,
          },
          style,
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}
