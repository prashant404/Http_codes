const express = require("express");
const {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/listController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(protect, createList).get(protect, getLists);
router
  .route("/:id")
  .get(protect, getListById)
  .put(protect, updateList)
  .delete(protect, deleteList);

module.exports = router;
