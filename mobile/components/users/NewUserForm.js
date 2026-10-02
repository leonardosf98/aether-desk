import { useState } from "react";
import { Keyboard } from "react-native";
import { ROLE_LABEL } from "../../theme";
import { Button, Card, Field } from "../../ui";
import { ChipGroup } from "../common/ChipGroup";
import { EmailField } from "../common/EmailField";
import { ErrorText } from "../common/ErrorText";
import { PasswordField } from "../common/PasswordField";

const EMPTY_FORM = { name: "", email: "", password: "", role: "cliente" };

export function NewUserForm({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setValue(key) {
    return (value) => setForm((current) => ({ ...current, [key]: value }));
  }

  function toggle() {
    setOpen(!open);
    setError("");
  }

  async function submit() {
    Keyboard.dismiss();
    setSaving(true);
    setError("");
    try {
      await onCreate(form);
      setForm(EMPTY_FORM);
      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Button
        title={open ? "Fechar formulário" : "Novo usuário"}
        variant={open ? "ghost" : "primary"}
        onPress={toggle}
      />
      {open ? (
        <Card style={{ marginTop: 12 }}>
          <Field label="Nome" value={form.name} onChangeText={setValue("name")} />
          <EmailField value={form.email} onChangeText={setValue("email")} />
          <PasswordField
            label="Senha inicial"
            value={form.password}
            onChangeText={setValue("password")}
            autoComplete="new-password"
          />
          <ChipGroup
            label="Papel"
            options={Object.entries(ROLE_LABEL)}
            value={form.role}
            onChange={setValue("role")}
          />
          <ErrorText>{error}</ErrorText>
          <Button title="Criar" loading={saving} onPress={submit} style={{ marginTop: 12 }} />
        </Card>
      ) : null}
    </>
  );
}
