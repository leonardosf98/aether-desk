export const PRODUCTION_API_URL = "https://react-native-apps.vercel.app";

export const API_URL = process.env.EXPO_PUBLIC_API_URL || PRODUCTION_API_URL;

function apiLog(...args) {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[API]", ...args);
  }
}

if (typeof __DEV__ !== "undefined" && __DEV__) {
  apiLog(
    "base:",
    API_URL,
    process.env.EXPO_PUBLIC_API_URL ? "(EXPO_PUBLIC_API_URL)" : "(produção, env não definida)",
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function xhrRequest(url, { method, headers, body }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 25000;
    xhr.onload = () => {
      let data = {};
      try {
        data = xhr.responseText ? JSON.parse(xhr.responseText) : {};
      } catch {
        data = {};
      }
      resolve({ status: xhr.status, data });
    };
    xhr.onerror = () => {
      apiLog("rede falhou", method, url);
      reject(new Error("Sem conexão com a API"));
    };
    xhr.ontimeout = () => {
      apiLog("timeout", method, url);
      reject(new Error("A API demorou demais para responder"));
    };
    xhr.open(method, url, true);
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    xhr.send(body ?? null);
  });
}

async function send(url, { method, ...options }) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (attempt === 0) apiLog("→", method, url);
    else apiLog("↻ tentativa", attempt + 1, method, url);
    try {
      const result = await xhrRequest(url, { method, ...options });
      apiLog("←", result.status, method, url);
      return result;
    } catch (error) {
      lastError = error;
      apiLog("✗", error.message, method, url);
      await sleep(400 * (attempt + 1));
    }
  }
  throw lastError;
}

export async function api(path, { token, method = "GET", body } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const { status, data } = await send(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (status < 200 || status >= 300) {
    apiLog("HTTP erro", status, method, `${API_URL}${path}`, data.error || data);
    const error = new Error(data.error || "Falha na requisição");
    error.status = status;
    throw error;
  }
  return data;
}
