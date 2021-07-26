const express = require("express");
const router = express.router();
const jwtMiddleware = require("../utils/jwtMiddleware");

const {
  createFriend,
  getAllFriends,
  updateFriendById,
  deleteFriendById,
} = require("./controller/friendController");

router.get("/get-all-friends", jwtMiddleware, getAllFriends);

router.post("/create-friend", jwtMiddleware, createFriend);

router.put("/update-friend-by-id", jwtMiddleware, updateFriendById);

router.delete("/delete-friend-by-id", jwtMiddleware, deleteFriendById);

module.exports = router;
