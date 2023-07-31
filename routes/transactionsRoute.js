const express = require("express");
const {
  addTransaction,
  getAllTrans,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transController");

const router = express.Router();


router.post('/add-transactions', addTransaction)
router.post("/edit-transactions", editTransaction);
router.post("/delete-transactions", deleteTransaction);
router.post('/get-transactions', getAllTrans)

module.exports = router;
