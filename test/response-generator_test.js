import {
  generateResponse,
  notFoundResponse,
} from "../src/http-response-class.js";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

describe("generateResponse", () => {
  it("should return an instance of Response Class of respective status codes and content-types and content", async () => {
    const body = "testing...";
    const status = 200;
    const contentType = "text/plain";
    const response = generateResponse(body, status, contentType);

    assertEquals(response instanceof Response, true);
    assertEquals(await response.text(), body);
    assertEquals(response.status, status);
    assertEquals(response.headers.get("content-type"), contentType);
  });

  it("should return an instance of Response, for pdf it should add content-disposition property", () => {
    const body = "testing...";
    const status = 200;
    const contentType = "application/pdf";
    const response = generateResponse(body, status, contentType);

    assertEquals(response instanceof Response, true);
    assertEquals(response.headers.get("content-type"), contentType);
    assertEquals(response.headers.get("Content-Disposition"), "attachment");
  });
});

describe("notFoundResponse", () => {
  it("should return an instance of Response class of status 404", async () => {
    const response = notFoundResponse();

    assertEquals(response instanceof Response, true);
    assertEquals(response.status, 404);
    assertEquals(await response.text(), "404 NOT FOUND");
  });
});
