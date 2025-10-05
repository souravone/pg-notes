import { Hono } from "hono";
import { getNotes } from "./db/queries";
import { auth } from "./lib/auth";

const app = new Hono().basePath("/api");

const router = app
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .get("/notes", async (c) => {
    try {
      const notes = await getNotes();
      return c.json(notes);
    } catch (err) {
      console.error(`Failed to fetch notes: \n`, err);
      return c.json({ error: "Failed to fetch notes" }, 500);
    }
  })
  .get("/people", (c) => {
    return c.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

export type AppType = typeof router;
export default app;
