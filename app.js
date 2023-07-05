// npm init -y

// npm i express body-parser mongoose cors

// npm i dotenv

// npm i mongoose-sequence

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./models/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accesstoken,x-refreshtoken");
  next();
}); //middleware for accessing token in client-side

app.use(express.static("uploads"));

const port = process.env.PORT || 8080;

app.use("/api/users", require("./routes/user.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/destinations", require("./routes/destination.route"));

app.listen(port, () => console.log(`Server is listening on port ${port}`)); //start the server
