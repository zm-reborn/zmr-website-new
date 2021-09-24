const process = require("process");

module.exports = {
  url: process.env.ELEVENTY_ENV === "development" ? "http://localhost:8080" : "https://zombiemaster.dev"
};
