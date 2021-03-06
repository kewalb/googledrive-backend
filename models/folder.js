const mongoose = require("mongoose");

const driveContentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  folders: {
    type: Array,
  },
  files: {
    type: Array,
  },
});

module.exports = mongoose.model("DriveContents", driveContentSchema);