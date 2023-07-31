const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTrans = async (req, res) => {
  try {
    const { frequency } = req.body;
    const { selectedDate } = req.body;
    const { type } = req.body;
    const { category } = req.body;
    const trans = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
        }),
      ...(category !=="all" && {category}),
      ...(type !== "all" && { type }),

      userid: req.body.userid,
    });
    res.status(201).json(trans);
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTrans = new transactionModel(req.body);
    await newTrans.save();

    res.status(201).json({
      success: true,
      newTrans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const editTransaction = async(req, res) => {
  try {
    await transactionModel.findOneAndUpdate({ _id: req.body.transactionid }, req.body.payload)
    res.status(201).json({
      success: true,
      message:"Edit Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
    
  }
}

const deleteTransaction =async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionid });
    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}

module.exports = {
  getAllTrans,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
