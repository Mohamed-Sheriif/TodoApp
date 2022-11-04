const { client } = require("../data/dbcontext");

client.connect();
const db = client.db("TodoTask");

async function findAll() {
  return new Promise(async (resolve, reject) => {
    const collec = await db.collection("note");
    const notes = await collec.find().sort({ index: 1 });
    const result = await notes.toArray();
    resolve(result);
  });
}

async function findById(id) {
  return new Promise(async (resolve, reject) => {
    const collec = await db.collection("note");
    const targetNote = await collec.findOne({ index: id });
    const result = await targetNote;
    resolve(result);
  });
}

async function create(note) {
  return new Promise(async (resolve, reject) => {
    const notes = await db.collection("note");
    await notes.insertOne(note);
    resolve(note);
  });
}

async function update(updNote, id) {
  return new Promise(async (resolve, reject) => {
    //console.log(updNote);
    const notes = await db.collection("note");
    await notes.updateOne({ index: id }, { $set: { title: updNote.title } });
    resolve(updNote);
  });
}

async function remove(id) {
  return new Promise(async (resolve, reject) => {
    const notes = await db.collection("note");
    await notes.deleteOne({ index: id });
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
