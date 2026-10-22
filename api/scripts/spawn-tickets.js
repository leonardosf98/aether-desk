const API_URL = process.env.API_URL || "http://localhost:3001";
const EMAIL = process.env.SPAWN_EMAIL || "cliente@aether.desk";
const PASSWORD = process.env.SPAWN_PASSWORD || "Cliente#123";
const COUNT = Number(process.env.SPAWN_COUNT || 5);
const INTERVAL_MS = Number(process.env.SPAWN_INTERVAL_MS || 10_000);
const AGENT_ID = process.env.SPAWN_AGENT_ID || "usr_agente";
const STAFF_EMAIL = process.env.SPAWN_STAFF_EMAIL || "admin@aether.desk";
const STAFF_PASSWORD = process.env.SPAWN_STAFF_PASSWORD || "Admin#123";

const samples = [
  { title: "Não consigo acessar o portal", description: "Após atualizar a senha, a tela fica em branco.", category: "acesso", priority: "alta" },
  { title: "Boleto duplicado", description: "Recebi dois boletos com o mesmo vencimento.", category: "financeiro", priority: "media" },
  { title: "App trava ao abrir chamados", description: "No Android 14 o app fecha sozinho na lista.", category: "tecnico", priority: "urgente" },
  { title: "Dúvida sobre plano", description: "Preciso saber se posso migrar para o plano anual.", category: "produto", priority: "baixa" },
  { title: "Outro assunto", description: "Gostaria de falar com um atendente sobre minha conta.", category: "outros", priority: "media" },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(path, { method = "GET", token, body } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

async function login(email, password) {
  const { token } = await request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  return token;
}

async function main() {
  const clientToken = await login(EMAIL, PASSWORD);
  const staffToken = await login(STAFF_EMAIL, STAFF_PASSWORD);

  console.log(
    `API: ${API_URL} — criando ${COUNT} chamado(s), intervalo ${INTERVAL_MS / 1000}s, atendente ${AGENT_ID}`
  );

  for (let i = 0; i < COUNT; i += 1) {
    const sample = samples[i % samples.length];
    const payload = {
      ...sample,
      title: `${sample.title} (#${i + 1})`,
    };
    const { ticket } = await request("/tickets", {
      method: "POST",
      token: clientToken,
      body: payload,
    });
    const { ticket: assigned } = await request(`/tickets/${ticket.id}`, {
      method: "PATCH",
      token: staffToken,
      body: { agentId: AGENT_ID },
    });
    console.log(
      `${i + 1}/${COUNT} ${assigned.id} — ${assigned.title} → ${assigned.agentName || AGENT_ID}`
    );

    if (i < COUNT - 1) {
      await sleep(INTERVAL_MS);
    }
  }

  console.log("Concluído.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
