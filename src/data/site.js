const process = require("process");

module.exports = {
  url: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://zombiemaster.dev"
};
