import { Field } from "../../ui";

export function EmailField({ label = "Email", ...props }) {
  return (
    <Field
      label={label}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="email"
      returnKeyType="next"
      blurOnSubmit={false}
      {...props}
    />
  );
}
