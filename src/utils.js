export const logErr = (...e) => console.error(...e);

export const log = (...e) => console.log(...e);

export const getFileExtension = (fileName) => fileName.split(".").at(-1);

export const getRelativePath = (path, prefix = "./public") => {
  const suffix = path === "/" ? "/index.html" : path;

  return prefix + suffix;
};

export const readFile = async (path) => {
  return await Deno.readFile(path);
};

export const determineContentType = (extension) => {
  const MIME = {
    html: "text/html",
    txt: "text/plain",
    css: "text/css",
    jpg: "image/jpeg",
    pdf: "application/pdf",
    js: "application/js",
    json: "application/json",
  };

  return MIME[extension] || MIME.txt;
};
