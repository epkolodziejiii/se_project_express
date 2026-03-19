const router = require("express").Router();
const auth = require("../middlewares/auth.js");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

//CRUD

//Read

router.get("/", getItems);

router.use(auth);
//Create

router.post("/", createItem);

//Update

router.put("/:itemId", updateItem);

//Delete

router.delete("/:itemId", deleteItem);

//like an item

router.put("/:itemId/likes", likeItem);

//unlike an item

router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
