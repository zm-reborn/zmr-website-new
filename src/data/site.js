import process from "process";

export default {
  url: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://zombiemaster.dev"
};
