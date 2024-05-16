const mongoose = require("mongoose");

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

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Contact.find({}).then((contacts) => {
    console.log("phonebook:");
    contacts.forEach((contact) =>
      console.log(`${contact.name} ${contact.number}`)
    );
    mongoose.connection.close();
  });
}
