const { verifyToken } = require("./token");

const authorize = (roles) => {
  return (req, res, next) => {
    // access the token
    const token = req.headers.authorization;
    if (token) {
      const payload = verifyToken(token);
      const role = payload?.role;
      if (roles?.includes(role)) return next();
      else
        res
          .status(401)
          .send({ message: "You are not authorized to access", error: "" });
    }
  };
};

module.exports = authorize;

//work as a middleware to check the role base of user to acces the customers List
