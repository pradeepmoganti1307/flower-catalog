import { notFoundResponse } from "./http-response-class.js";
import { saveGuestComments,  serveGuestComments } from "./handlers/guest-book-handlers.js";
import {
  serveStaticFile,
} from "./handlers/serveStaticFiles.js";

const GET_handlers = (route) => {
  const handlers = {
    "/fetch-comments": serveGuestComments,
  };

  return handlers[route] || serveStaticFile;
};

const POST_handlers = (route) => {
  const handlers = {
    "/save-comments": saveGuestComments,
  };

  return handlers[route] || notFoundResponse;
};

export const createHandler = (comments) => {
  const handlers = {
    GET: GET_handlers,
    POST: POST_handlers,
  };

  return (request) => {
    request._url = new URL(request.url);
    request.context = { comments };

    const actualHandler = handlers[request.method](request._url.pathname);
    return actualHandler(request);
  };
};
