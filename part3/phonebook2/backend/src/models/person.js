const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI;

console.log("coneccting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
});

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Person", personSchema);
