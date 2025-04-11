const createTdTag = (value) => {
  const td = document.createElement("td");
  td.textContent = value;
  return td;
};

const createRow = (values) => {
  const tr = document.createElement("tr");
  const tdTags = values.map(createTdTag);

  tr.replaceChildren(...tdTags);
  return tr;
};

const createTableBody = (records) => {
  const tbody = document.createElement("tbody");
  const trTags = records.map(Object.values).map(createRow);

  tbody.replaceChildren(...trTags);
  return tbody;
};

const loadCommentsFromServer = async () => {
  const response = await fetch("/fetch-comments");
  const comments = await response.json();

  const table = document.querySelector("#comments-table");
  const newTableBody = createTableBody(comments);
  const oldTableBody = document.querySelector("#comments-table tbody");
  table.replaceChild(newTableBody, oldTableBody);

  return;
};

const submitCommentsToServer = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const response = await fetch("/save-comments", {
    method: "POST",
    body: formData,
  });

  form.reset();
  if (response.ok) return loadCommentsFromServer();
};

const main = async () => {
  const form = document.querySelector("#comment-form");
  await loadCommentsFromServer();

  form.addEventListener("submit", submitCommentsToServer);
};

globalThis.onload = main;
