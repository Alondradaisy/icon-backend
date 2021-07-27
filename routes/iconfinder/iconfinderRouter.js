const express = require("express");
const router = express.Router();
const axios = require("axios");
router.get("/", async (req, res) => {
  let data = await axios.get(
    "https://api.iconfinder.com/v4/icons/search?query=arrow&count=10",
    {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer zIrNU9HJBdceao7UnIyCVNZ3AbZVsUw4e46ONPUoSusZnUacilp5LYZBBHHi7TeO",
      },
    }
  );
  res.status(200).json(data.data);
});
module.exports = router;
