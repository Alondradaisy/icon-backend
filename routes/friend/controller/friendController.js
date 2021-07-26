//CRUD reqs to create friend - usability option could be to make a list of friends you want to send icons to (biz website, survey, ratings)

const Friend = require("../model/Friend");
const User = require("../../user/model/User.js");

const getAllFriends = async (req, res) => {
  try {
    const { decodedJwt } = res.locals;
    let payload = await User.findOne({ email: decodedJwt.email })
      .populate({
        path: "friends",
        model: Friend,
        select: "-__v",
      })
      .select("-email -password -firstName -lastName -__v - _id -username");
    res.json(payload);
  } catch (e) {
    res.status(500).json({ e: e, message: e.message });
  }
};

const createFriend = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress } = req.body;
    const addedFriend = new Friend({
      firstName,
      lastName,
      emailAddress,
    });
    const savedAddedFriend = await addedFriend.save();
    const { decodedJwt } = res.locals;

    const foundTargetUser = await User.findOne({ email: decodedJwt.email });
    foundTargetUser.friends.push(savedAddedFriend._id);
    await foundTargetUser.save();
    res.json(savedAddedFriend);
  } catch (e) {
    res.status(500).json({ e: e, message: e.message });
  }
};

const updateFriendById = async (req, res, next) => {
  let updateObj = {};
  let body = req.body;
  for (let key in body) {
    if (body[key] !== "") {
      updatedObj[key] = body[key];
    }
  }
  console.log(updatedObj);
  try {
    let updatedFriend = await Friend.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    ).select("-__v");

    res.json({
      message: "success",
      payload: updatedFriend,
    });
  } catch (e) {
    next(e);
  }
};

const deleteFriendById = async (req, res, next) => {
  try {
    let deletedFriend = await Friend.findByIdAndRemove(req.params.id);

    const { decodedJwt } = res.locals;

    let foundUser = User.findOne({ email: decodedJwt.email });
    let foundUserArr = foundUser.friends;
    let filteredFriendsArr = foundUserArr.filter((id) => {
      id.toString() !== deletedFriend._id.toString();
    });

    foundUser.friends = filteredFriendsArr;
    await foundUser.save();
    res.json({ message: "success", payload: deletedFriend });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllFriends,
  createFriend,
  updateFriendById,
  deleteFriendById,
};
