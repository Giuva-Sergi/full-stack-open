const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://empedocle:${password}@fullstack-open-cluster.smzm6ue.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Fullstack-open-cluster`;

mongoose.set("strictQuery", false);

// mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

let notes = [
  {
    content: "HTML is easy",
    important: true,
  },
  {
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const note = new Note({
  content: "HTML is easy",
  important: true,
});

const note = new Note({
  content: "This is just a second note",
  important: Math.random() > 0.5 ? true : false,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

Note.find({}).then((results) => {
  results.forEach((res) => {
    console.log(res);
    mongoose.connection.close();
  });
});
