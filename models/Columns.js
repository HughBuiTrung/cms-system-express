const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  lists: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Column", columnSchema);
