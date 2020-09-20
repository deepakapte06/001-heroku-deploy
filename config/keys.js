//keys.js - figure out what set od credential to return
if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = git require("./prod");
} else {
  // we are in development - i.e local machine
  module.exports = require("./dev");
}
