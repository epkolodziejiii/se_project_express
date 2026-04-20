const router = require("express").Router();
const clothingItemRouter = require("./clothingItems"); // Fixed naming
const userRouter = require("./users");
const { createUser, login } = require("../controllers/user"); // Keep for root routes
const {
  createUserValidator,
  loginValidator,
} = require("../middlewares/validation");

// ROOT ROUTES (public)
router.post("/signin", loginValidator, login);
router.post("/signup", createUserValidator, createUser);

// API ROUTES
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// 404 HANDLER - MUST BE LAST
router.use((req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err); // Let errorHandler respond
});

module.exports = router;
