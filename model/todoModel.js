// Require mongoose
// From mongoose, we use a method called Schema. This defines the structure of the document we'll store in the collection. It's the thing that wraps around
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traineeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Let's create our model(Model is what surrounds the schema and provides us with an interface by which to communicate with our database.)

const Trainees = mongoose.model("Trainee", traineeSchema);

module.exports = Trainees;
