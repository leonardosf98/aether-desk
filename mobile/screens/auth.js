import { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { COMPANY } from "../company";
import { Button, Card, Field, Muted, Screen } from "../ui";
import {
  BackLink,
  EmailField,
  ErrorText,
  FormScroll,
  Logo,
  PasswordField,
  ScreenHeader,
} from "../components";

export function LoginScreen({ onLogin, onGoRegister, loading, error }) {
  const [email, setEmail] = useState("cliente@aether.desk");
  const [password, setPassword] = useState("Cliente#123");
  function submit() {
    Keyboard.dismiss();
    onLogin(email, password);
  }
  return (
    <Screen>
      <FormScroll centered>
        {/* Pressable e não aquele de opacity */}
        <Pressable onPress={Keyboard.dismiss}>
          <Logo style={{ marginBottom: 18 }} />
          <ScreenHeader
            title={COMPANY.nomeFantasia}
            subtitle={`Central de chamados. CNPJ ${COMPANY.cnpj}`}
            style={{ marginBottom: 24 }}
          />
        </Pressable>
        <Card>
          <EmailField value={email} onChangeText={setEmail} placeholder="você@empresa.com" />
          <PasswordField
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            returnKeyType="go"
            onSubmitEditing={submit}
          />
          <ErrorText>{error}</ErrorText>
          <Button title="Entrar" loading={loading} onPress={submit} />
          <Button
            title="Criar conta de cliente"
            variant="ghost"
            onPress={onGoRegister}
            style={{ marginTop: 10 }}
          />
        </Card>
        <Pressable onPress={Keyboard.dismiss}>
          <Muted style={{ marginTop: 16 }}>
            Demo: cliente@aether.desk · agente@aether.desk · admin@aether.desk
          </Muted>
        </Pressable>
      </FormScroll>
    </Screen>
  );
}

export function RegisterScreen({ onRegister, onBack, loading, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function submit() {
    Keyboard.dismiss();
    onRegister({ name, email, password });
  }
  return (
    <Screen>
      <FormScroll>
        <BackLink onPress={onBack} />
        <ScreenHeader
          title="Nova conta"
          subtitle={`Cadastro de cliente em ${COMPANY.nomeFantasia}.`}
          style={{ marginBottom: 20 }}
        />
        <Card>
          <Field label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" />
          <EmailField value={email} onChangeText={setEmail} />
          <PasswordField
            value={password}
            onChangeText={setPassword}
            autoComplete="new-password"
            returnKeyType="go"
            onSubmitEditing={submit}
          />
          <ErrorText>{error}</ErrorText>
          <Button title="Cadastrar" loading={loading} onPress={submit} />
        </Card>
      </FormScroll>
    </Screen>
  );
}
