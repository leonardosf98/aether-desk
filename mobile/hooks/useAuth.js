import { useCallback, useEffect, useState } from "react";
import { api } from "../apiClient";
import { clearToken, loadToken, saveToken } from "../authStore";

/* Hook customizado criado para gerenciar a autenticação
alguns estados padrões para definição dos tokens, user, boot, erro de autenticação e carregamento.
pra que criar token e setToken e usar setToken(novoValor) ao invés de fazer só 
let token = "";
token = "novoValor"
Isso acima travaria o que está na tela, o componente precisaria ser destruido e reconstruido, o que custaria muito
Ao usar o set*** a gente avisa ao react que o valor mudou e ele trata de mudar o valor em tela


Explicando algumas funções nesse cara aqui

Secure Store
É um tipo de armazenamento seguro dentro do dispositivo
em variável o valor se perderia
No async storage não tem criptografia
Ai usamos o SecureStore para armazenar credenciais e tokens.

useEffect, funciona como "depois de renderizar esse componente, roda x,y,z. pode se basear em dependencias que são o segundo argumento, "
  useEffect(() => {
    // efeito
  }, dependências);

se tiramos a dependencia, roda depois de toda renderização
se botarmos uma lista vazia, só depois da primeira renderização

*/

export function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [boot, setBoot] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const hydrate = useCallback(async (nextToken) => {
    const me = await api("/auth/me", { token: nextToken });
    setUser(me.user);
    setToken(nextToken);
  }, []);

  useEffect(() => {
    (async () => {
      const stored = await loadToken();
      if (stored) {
        try {
          await hydrate(stored);
        } catch {
          await clearToken();
        }
      }
      setBoot(false);
    })();
  }, [hydrate]);

  async function login(email, password) {
    setAuthLoading(true);
    setAuthError("");
    try {
      const data = await api("/auth/login", { method: "POST", body: { email, password } });
      await saveToken(data.token);
      await hydrate(data.token);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(payload) {
    setAuthLoading(true);
    setAuthError("");
    try {
      const data = await api("/auth/register", { method: "POST", body: payload });
      await saveToken(data.token);
      await hydrate(data.token);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function logout() {
    await clearToken();
    setToken(null);
    setUser(null);
    setAuthError("");
  }

  return { token, user, boot, authError, authLoading, login, register, logout, setAuthError };
}
