const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/Travel";

mongoose.connect(url);

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connected to Database");
});

conn.on("error", () => {
  console.log("Could not connected to Database");
});

conn.on("disconnected", () => {
  console.log("Disconnected from Database");
});
