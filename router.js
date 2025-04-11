import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStaticFile } from "./src/handlers/serveStaticFiles.js";

import {
  serveGuestComments,
  saveGuestComments,
} from "./src/handlers/guest-book-handlers.js";

const setComments = (comments) => {
  return async (ctx, next) => {
    ctx.comments = comments;
    await next();
  };
};

const main = (port = 8000) => {
  const app = new Hono();
  const comments = [{ name: "apple", comment: "ball" }];

  try {
    app.use(logger());
    app.use("*", setComments(comments));
    app.post("/save-comments", saveGuestComments);
    app.get("/fetch-comments", serveGuestComments);
    app.get("*", serveStaticFile);
    Deno.serve({ port }, app.fetch);
  } catch {
    console.error("error:Intiating a Server");
  }
};

main();
