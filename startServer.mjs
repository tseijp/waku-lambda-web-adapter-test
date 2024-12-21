import { Hono } from "hono";
import { compress } from "hono/compress";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { serverEngine } from "waku/unstable_hono";

const app = new Hono();

app.use(compress());

app.use(serveStatic({ root: "./dist/public" }));

app.use(
  serverEngine({
    cmd: "start",
    loadEntries: () => import("./dist/entries.js"),
    env: process.env,
  })
);

app.notFound((c) => c.text("404 Not Found", 404));


const port = 8080;
console.log(`ready: Listening on http://localhost:${port}/`);

serve({ fetch: app.fetch, port });
