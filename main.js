import { createHandler } from "./src/app.js";
import { logErr } from "./src/utils.js";

const main = (port = 8000) => {
  const comments = [];

  try {
    Deno.serve({ port }, createHandler(comments));
  } catch(e) {
    // log error message from error instance
    logErr("error:Intiating a Server", e);
  }
};

main();
