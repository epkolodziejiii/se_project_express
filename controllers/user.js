const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,

  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))

    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userCopy = user.toObject();
        delete userCopy.password;
        res.status(201).send(userCopy);
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res
            .status(BAD_REQUEST_STATUS_CODE)
            .send({ message: err.message });
        }
        if (err.name === "11000") {
          return res.status(409).send({ message: "Duplicate Email" });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      })
  );
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS_CODE).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// Update from task #3
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ message: "All fields are required!" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((error) => {
      if (error.message === "Incorrect email or password") {
        res
          .status(UNAUTHORIZED_STATUS_CODE)
          .send({ message: "Check email and password" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, avatar })
    .then((user) => res.status(200).send({ user }))

    .catch((err) => {
      console.error(err);
      if (err.message === "Authorization Required") {
        res
          .status(UNAUTHORIZED_STATUS_CODE)
          .send({ message: "Incorrect Username" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error From updateProfile" });
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
