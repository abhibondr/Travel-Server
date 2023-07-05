// npm i jsonwebtoken

const jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn = 30 * 60) => {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn });
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (err) {
    console.log(err);
  }
  return null;
};

module.exports = { createToken, verifyToken };
