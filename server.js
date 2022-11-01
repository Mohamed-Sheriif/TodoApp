const http = require("http");
const {
  getNotes,
  addNotes,
  getNote,
  updateNotes,
  deleteNote,
} = require("./controllers/noteControllers");

const server = http.createServer((req, res) => {
  if (req.url === "/api/notes" && req.method === "GET") {
    getNotes(req, res);
  } else if (req.url.match(/\/api\/notes\/[0-9]+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getNote(req, res, id);
  } else if (req.url === "/api/notes" && req.method === "POST") {
    addNotes(req, res);
  } else if (req.url.match(/\/api\/notes\/[0-9]+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateNotes(req, res, id);
  } else if (req.url.match(/\/api\/notes\/[0-9]+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteNote(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "404 Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
