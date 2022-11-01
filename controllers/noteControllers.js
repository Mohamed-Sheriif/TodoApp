const Notes = require("../models/noteModels");
const { getPostData } = require("../utils");

//@desc get all notes
//@route GET /api/notes
async function getNotes(req, res) {
  try {
    const allNotes = await Notes.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allNotes));
  } catch (error) {
    console.log(error);
  }
}

//@desc get specific note
//@route GET /api/notes/:id
async function getNote(req, res, id) {
  const note = await Notes.findById(Number(id));

  if (!note) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "404 Note Not Found" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(note));
  }
}

//@desc add a note
//@route POST /api/notes
async function addNotes(req, res) {
  try {
    const body = await getPostData(req);

    const { title, desc, index } = JSON.parse(body);

    const note = {
      title,
      desc,
      index,
    };

    const noteRes = await Notes.create(note);

    res.writeHead(202, { "Content-Type": "application/json" });
    res.end(JSON.stringify(noteRes));
  } catch (error) {
    console.log(error);
  }
}

//@desc update a note
//@route PUT /api/notes/:id
async function updateNotes(req, res, id) {
  const note = await Notes.findById(Number(id));
  console.log(note);
  if (!note) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Note Not Found" }));
  } else {
    const body = await getPostData(req);

    const { title, desc } = JSON.parse(body);

    const noteData = {
      title: title || note.title,
      desc: desc || note.desc,
      index: note.index,
    };
    console.log(noteData);

    const updNote = await Notes.update(noteData, Number(id));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updNote));
  }
}

//@desc delete specific note
//@route DELETE /api/notes/:id
async function deleteNote(req, res, id) {
  const note = await Notes.findById(Number(id));

  if (!note) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "404 Note Not Found" }));
  } else {
    await Notes.remove(Number(id));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Product ${id} removed` }));
  }
}

module.exports = {
  getNotes,
  getNote,
  addNotes,
  updateNotes,
  deleteNote,
};
