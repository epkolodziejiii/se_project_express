const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  ASSERTION_ERROR_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const { createUser, login } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userRouter);

router.use("/items", clothingItem);
router.use((req, res) => {
  res.status(INTERNAL_SERVER_ERROR).send({ message: "Router not found" });
});

module.exports = router;
