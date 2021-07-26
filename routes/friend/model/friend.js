const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("friend", FriendSchema);
