import { Image } from "react-native";
import { LOGO_URI } from "../../assets/logo";

export function Logo({ size = 56, radius = 18, style }) {
  return (
    <Image
      source={{ uri: LOGO_URI }}
      style={[{ width: size, height: size, borderRadius: radius }, style]}
    />
  );
}
