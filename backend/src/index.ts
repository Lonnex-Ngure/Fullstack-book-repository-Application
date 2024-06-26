import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { booksRouter } from "./books/book.router";
import { usersRouter } from "./users/user.router";

const app = new Hono();

// Using Hono's built-in CORS middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", booksRouter);
app.route("/api", usersRouter);

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
