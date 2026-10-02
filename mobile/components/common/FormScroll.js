import { ScrollView } from "react-native";

export function FormScroll({ children, centered }) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        { paddingBottom: 32 },
        centered ? { flexGrow: 1, justifyContent: "center" } : null,
      ]}
    >
      {children}
    </ScrollView>
  );
}
