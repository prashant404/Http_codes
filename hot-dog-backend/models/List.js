const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  responseCodes: {
    type: [String],
    required: true,
  },
  imageLinks: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const List = mongoose.model("List", ListSchema);
module.exports = List;
