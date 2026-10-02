import { Platform, Pressable, Text, View } from "react-native";
import { colors } from "../../theme";

export function TabBar({ tabs, current, onChange, badge }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderColor: colors.line,
        paddingBottom: Platform.OS === "ios" ? 28 : 18,
        paddingTop: 10,
        paddingHorizontal: 16,
      }}
    >
      {tabs.map((tab) => {
        const active = current === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View style={{ position: "relative" }}>
              <Text
                style={{
                  color: active ? colors.primary : colors.muted,
                  fontWeight: active ? "800" : "600",
                  fontSize: 13,
                }}
              >
                {tab.label}
              </Text>
              {tab.key === badge?.key && badge.count > 0 ? (
                <View
                  style={{
                    position: "absolute",
                    right: -14,
                    top: -8,
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    minWidth: 16,
                    height: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ color: colors.onPrimary, fontSize: 10, fontWeight: "800" }}>
                    {badge.count}
                  </Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
