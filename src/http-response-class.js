class HTTPResponse {
  constructor(body = null, status = 200) {
    this.body = body;
    this.status = status;
    this.headers = {};
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  createResponse() {
    return new Response(this.body, {
      status: this.status,
      headers: this.headers,
    });
  }
}

const generateResponse = (content, status = 200, contentType) => {
  const response = new HTTPResponse(content, status);

  if (contentType === "application/pdf")
    response.setHeader("Content-Disposition", "attachment");

  return response.setHeader("content-type", contentType).createResponse();
};

const notFoundResponse = () => {
  return generateResponse("404 NOT FOUND", 404);
};

export { notFoundResponse, generateResponse, HTTPResponse };
