const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpenseModel = require("./models/expenses");
const cors = require("cors");
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/budgetTracker");
    console.log("MongoDb connect");
  } catch (error) {
    console.log("Error in connecting mongodb");
  }
};
app.use(cors());

app.post("/expense", async (req, res) => {
  try {
    const { income, allExpense, totalExpense } = req.body;
    if(!income || !allExpense || !totalExpense ){
        res.status(400).json({message:"Invalid data"})
    }
    const newExpense = new ExpenseModel({
      income,
      allExpenses: allExpense,
      totalExpense: totalExpense,
    });
    await newExpense.save();
    res.status(200).json({ message: "Entry added" });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

app.put("/updateExpense", async (req, res) => {
  try {
    const { entryId, income, allExpense, totalExpense } = req.body;
    const updateExpense = await ExpenseModel.findByIdAndUpdate(entryId, {
      income,
      allExpenses: allExpense,
      totalExpense: totalExpense,
    });

    res.status(200).json({ message: "entry updated" ,updateExpense});
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

app.delete("/deleteExpense",async (req, res) => {
  try {
    const entryId = req.params.entryId;
    await ExpenseModel.findByIdAndDelete(entryId)
    res.json(200).json({message:"Expense removed"})
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

app.get('/getAllExpense',async(req,res)=>{
    try {
        const allExpenses = await ExpenseModel.find()
        res.status(200).json({messge:"Data fetched successfully",allExpenses})
    } catch (error) {
        res.status(500).json("Internal server error");

    }
})

app.listen(3000, () => {
  dbConnect();
  console.log("server is running");
});
