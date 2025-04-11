import { generateResponse } from "../http-response-class.js";
import { determineContentType } from "../utils.js";

export const serveGuestComments = (context) => {
  const comments = JSON.stringify(context.comments);
  const contentType = determineContentType("json");

  return generateResponse(comments, 200, contentType);
};

const parseGuestBookFormData = (formData) => {
  return {
    name: formData.get("user-name"),
    comments: formData.get("comment-box"),
  };
};

export const saveGuestComments = async (context) => {
  const formData = await context.req.formData();
  const commentPosted = parseGuestBookFormData(formData);

  context.comments.push(commentPosted);
  return generateResponse("successfully added comments", 201);
};
