const express = require("express");
const router = express.Router();
const jwtMiddleWare = require("../utils/jwtMiddleware");

const apiKey = process.env.API_KEY;
const icons = require("iconFinder")(apiKey, clientId);

// const url = "https://api.iconfinder.com/v4/icons/search?query=social&count=10";

axios.get("https://api.iconfinder.com/v4/icons/search?query=arrow&count=10", {
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer zIrNU9HJBdceao7UnIyCVNZ3AbZVsUw4e46ONPUoSusZnUacilp5LYZBBHHi7TeO",
  },
});
// const options = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     Authorization:
//       "Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1",
//   },
// };
let results;

fetch(url, options)
  .then((res) => res.json(icons))

  .then((json) => console.log(json))

  .catch((err) => console.error("error:" + err));

module.exports = router;
