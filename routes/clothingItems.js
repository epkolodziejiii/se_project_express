const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const {
  createItemValidation,
  idValidator,
} = require("../middlewares/validation");

// Public: get all items
router.get("/", getItems);

// Protected: everything below needs auth
router.use(auth);
router.post("/", createItemValidation, createItem);
router.patch("/:itemId", idValidator, updateItem);
router.delete("/:itemId", idValidator, deleteItem);
router.put("/:itemId/likes", idValidator, likeItem);
router.delete("/:itemId/likes", idValidator, unlikeItem);

module.exports = router;
