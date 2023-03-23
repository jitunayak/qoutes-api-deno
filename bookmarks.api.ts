import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { quotes } from "./quotes.ts";
const port = Deno.env.get("PORT") || 8080;
const app = new Application();
const router = new Router();

router.get("/api/v1/quotes/random", (ctx) => {
  const index = Math.floor(Math.random() * quotes.size);
  ctx.response.body = {id: index, quote: quotes.get(index)};
});

router.get("/api/v1/quotes:id", (ctx) => { 
  if (quotes?.has(+ctx?.params?.id)) {
    ctx.response.body = { id:ctx?.params?.id, quote:quotes.get(+ctx.params.id)};
  }
});

router.get("/api/v1/quotes", (ctx) => {
  ctx.response.body = Array.from(quotes.entries());
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🌳 oak server running at port ${port} 🌳`);

await app.listen({ port: +port });
