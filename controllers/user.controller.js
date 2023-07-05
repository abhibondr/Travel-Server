const { encrypt } = require("../helpers/encryption");
const { UserModel, pickUser } = require("../models/user.model");
const _ = require("lodash");

const userCtrl = {
  createUser(req, res) {
    let data = [req.body];

    console.log("Req.file ", req.file);
    if (Array.isArray(req.body)) data = req.body;

    // encrypt the password
    if (Array.isArray(data)) {
      data = data?.map((user, i) => {
        if (user?.password && req?.file) {
          return {
            ...user,
            password: encrypt(user?.password),
            avatar: `avatars/${req.file?.filename}`,
          };
        } else if (user?.password) {
          return {
            ...user,
            password: encrypt(user?.password),
          };
        } else if (req.file) {
          return {
            ...user,
            avatar: `avatars/${req.file?.filename}`,
          };
        }
        return user;
      });
    }

    UserModel.insertMany(data)
      .then((result) => {
        console.log("Saved: ", result);
        // if (!result) throw new Error("user not created");
        res
          .status(201)
          .send({ message: "User Created", data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the user", error: err });
      });
  }, //createUser

  updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;

    // encrypt the password
    if (user?.password) {
      user.password = encrypt(user?.password);
    }
    if (req?.file) {
      user.avatar = `avatars/${req.file?.filename}`;
    }

    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        if (!result) throw new Error("user not updated");
        res
          .status(200)
          .send({ message: "User updated", data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not updated the user", error: err });
      });
  }, //updateUser

  deleteUser(req, res) {
    const { id } = req.params;
    UserModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User deleted", data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not deleted the user", error: err });
      });
  }, //deleteUser

  fetchOneUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        if (!result) throw new Error("user not available");
        res
          .status(200)
          .send({ message: "User available", data: this.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not available the user", error: err });
      });
  }, //fetchOneUser

  fetchAllUsers(req, res) {
    const filter = {
      $or: [{ status: 0 }, { status: 1 }],
    };

    const { status } = req.query;

    if (status) filter.status = status;

    UserModel.find(filter)
      .then((result) => {
        if (!result) throw new Error("user not available");

        res.status(200).send({
          message: "User available",
          data: _.map(result, pickUser),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not available the user", error: err });
      });
  }, //fetchAllUsers
};

module.exports = userCtrl;

// https://localhost:9090/users
// https://localhost:9090/users/routeparams -> req.params
// https://localhost:9090/users?key=value&key2=value -> req.query
