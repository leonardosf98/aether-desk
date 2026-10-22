import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import { COMPANY } from "./company.js";
import { createDb, migrate } from "./db.js";
import { seedIfEmpty } from "./seed.js";
import { authRoutes, userRoutes } from "./routes/users.js";
import { notificationRoutes, ticketRoutes } from "./routes/tickets.js";

let appPromise;

export async function createApp() {
  const db = createDb();
  await migrate(db);
  await seedIfEmpty(db);

  const app = new Hono();
  
  const baseCors = cors({
    origin: process.env.CORS_ORIGIN || "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  });
  app.use("*", async (c, next) => {
    if (c.req.method === "OPTIONS") {
      const res = await baseCors(c, async () => {});
      if (c.req.header("Access-Control-Request-Private-Network") === "true") {
        res.headers.set("Access-Control-Allow-Private-Network", "true");
      }
      return res;
    }
    await baseCors(c, next);
  });
app.use(logger())
  app.get("/health", (c) =>
    c.json({ ok: true, service: "aether-desk-api", company: COMPANY.nomeFantasia })
  );

  app.route("/auth", authRoutes(db));
  app.route("/users", userRoutes(db));
  app.route("/tickets", ticketRoutes(db));
  app.route("/notifications", notificationRoutes(db));

  return app;
}

export function getApp() {
  if (!appPromise) appPromise = createApp();
  return appPromise;
}

export default {
  async fetch(request) {
    const app = await getApp();
    return app.fetch(request);
  },
};
