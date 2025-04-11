import { generateResponse, notFoundResponse } from "../http-response-class.js";
import {
  readFile,
  getFileExtension,
  determineContentType,
  getRelativePath,
  logErr,
} from "../utils.js";

export const serveStaticFile = async (context) => {
  const request = context.req;
  const path = getRelativePath(request.path);

  try {
    const content = await readFile(path);
    const fileExtension = getFileExtension(path);
    const contentType = determineContentType(fileExtension);

    return generateResponse(content, 200, contentType);
  } catch {
    logErr("error:Reading file", path);
    return notFoundResponse();
  }
};
