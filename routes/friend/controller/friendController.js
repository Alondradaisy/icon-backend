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
