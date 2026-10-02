import { Image } from "react-native";

export function Logo({ size = 56, radius = 18, style }) {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={[{ width: size, height: size, borderRadius: radius }, style]}
    />
  );
}
