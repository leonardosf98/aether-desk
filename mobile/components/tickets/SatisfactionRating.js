import Slider from "@react-native-community/slider";
import { useState } from "react";
import { colors } from "../../theme";
import { Card, Muted } from "../../ui";
import { SectionTitle } from "../common/SectionTitle";

function ratingLabel(value) {
  if (value <= 2) return "Ruim";
  if (value === 3) return "Regular";
  return "Bom";
}

export function SatisfactionRating() {
  const [satisfaction, setSatisfaction] = useState(3);
  return (
    <Card style={{ marginTop: 16 }}>
      <SectionTitle>Avaliar atendimento</SectionTitle>
      <Muted style={{ marginBottom: 8 }}>
        {satisfaction}/5 — {ratingLabel(satisfaction)}
      </Muted>
      <Slider
        value={satisfaction}
        onValueChange={setSatisfaction}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.line}
        thumbTintColor={colors.primary}
      />
    </Card>
  );
}
