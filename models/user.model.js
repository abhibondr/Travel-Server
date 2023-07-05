const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: { type: String, minlength: 3, max: 25 },
    last: { type: String, minlength: 3, max: 25 },
  },

  mobile: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    required: [true, "User mobile number required"],
  },

  email: String,
  password: String,
  avatar: String,
  role: String,
  status: Number,
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(autoIncrement, { inc_field: "userId" });

function pickUser(user) {
  return _.pick(user, [
    "_id",
    "name",
    "mobile",
    "email",
    "status",
    "role",
    "userId",
    "avatar",
    "createdAt",
  ]);
}

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel, pickUser };
