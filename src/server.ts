import "core-js/features/reflect";

import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import { createYoga } from "graphql-yoga";

const storePage = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0e385d" />
    <title>DrCalc — Baixe o aplicativo</title>
    <style>
      :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; overflow: hidden; color: #0e385d; background: radial-gradient(circle at 18% 15%, #eaf4ff 0, transparent 31rem), radial-gradient(circle at 90% 85%, #fff0b7 0, transparent 28rem), #f8fafc; }
      main { width: min(92vw, 580px); padding: 44px 30px 38px; text-align: center; background: rgba(255,255,255,.78); border: 1px solid rgba(255,255,255,.9); border-radius: 32px; box-shadow: 0 24px 80px rgba(14,56,93,.14); backdrop-filter: blur(12px); }
      .mark { width: 90px; height: 90px; margin: 0 auto 22px; display: grid; place-items: center; border-radius: 27px; color: #fff; background: linear-gradient(145deg, #1e5c8f, #0e385d); box-shadow: 0 12px 22px rgba(14,56,93,.24); font-size: 53px; font-family: Georgia, serif; font-weight: bold; }
      h1 { margin: 0; font-size: clamp(2rem, 6vw, 2.7rem); letter-spacing: -.055em; }
      p { max-width: 405px; margin: 14px auto 30px; color: #597089; font-size: 1.08rem; line-height: 1.55; }
      .stores { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }
      .store { min-width: 182px; padding: 12px 17px; display: flex; align-items: center; gap: 11px; border-radius: 14px; color: white; background: #111827; text-decoration: none; text-align: left; box-shadow: 0 7px 14px rgba(17,24,39,.16); transition: transform .18s ease, box-shadow .18s ease; }
      .store:not(.disabled):hover { transform: translateY(-3px); box-shadow: 0 11px 20px rgba(17,24,39,.22); }
      .store.disabled { opacity: .55; cursor: default; }
      .store svg { width: 28px; height: 28px; flex: none; }
      .store small, .store strong { display: block; } .store small { font-size: .64rem; letter-spacing: .01em; } .store strong { font-size: 1.05rem; line-height: 1.2; }
      footer { margin-top: 32px; color: #8a9aaa; font-size: .78rem; }
    </style>
  </head>
  <body>
    <main>
      <div class="mark" aria-hidden="true">⚕</div>
      <h1>DrCalc</h1>
      <p>O DrCalc agora está disponível como aplicativo. Baixe para ter as calculadoras sempre à mão.</p>
      <div class="stores">
        <a class="store" href="https://link.orango.io/blO19" target="_blank" rel="noopener noreferrer" aria-label="Baixar DrCalc no Google Play">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#42d38b" d="M3 2.8v18.4L13.2 12z"/><path fill="#5ca8ff" d="m13.2 12 3.1-3.1L5.3 2.7z"/><path fill="#ffd15c" d="m13.2 12 3.1 3.1-11 6.2z"/><path fill="#ff6b6b" d="M16.3 8.9 19.8 11a1.2 1.2 0 0 1 0 2l-3.5 2.1-2.3-3.1z"/></svg>
          <span><small>DISPONÍVEL NO</small><strong>Google Play</strong></span>
        </a>
        <span class="store disabled" role="status" aria-label="App Store em breve">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.7-.7 3.1-.7 1.5 0 1.9.7 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-3-1.2-3-3.8ZM14.5 6.3c.7-.9 1.1-2.1 1-3.3-1 .1-2.2.7-2.9 1.6-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.5 2.9-1.4Z"/></svg>
          <span><small>EM BREVE NA</small><strong>App Store</strong></span>
        </span>
      </div>
      <footer>API DrCalc</footer>
    </main>
  </body>
</html>`;

// Create a Prisma Client instance.
const prisma = new PrismaClient();

const schema = buildSchema({
  resolvers,
  validate: false,
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, context: { prisma } });

// Keep GraphQL at /graphql while presenting the mobile app at the public root.
const server = createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end('{"status":"ok"}');
    return;
  }

  if (request.url === "/" || request.url?.startsWith("/?")) {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(storePage);
    return;
  }

  yoga(request, response);
});

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
