const mongoose = require("mongoose");

console.log(process.argv);

if (process.argv.length < 3) {
  console.log("You have to include your password!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://giovannisrg:${password}@clusterphonebook.jaavlfi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterPhonebook`;

mongoose.set("strictQuery", false);

// establish connection with the db
mongoose.connect(url);

// create schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create model
const Contact = mongoose.model("Contact", contactSchema);
