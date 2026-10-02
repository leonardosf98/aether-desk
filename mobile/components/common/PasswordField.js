import { Field } from "../../ui";

export function PasswordField({ label = "Senha", ...props }) {
  return <Field label={label} secure autoCapitalize="none" autoComplete="password" {...props} />;
}
