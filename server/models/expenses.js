const mongoose = require('mongoose')
const {Schema} = require('mongoose')


const expenseSchema = new Schema({
    income : {
        type : Number,
        require : true
    },
    allExpenses : [],    
    totalExpense : Number
})

const ExpenseModel = mongoose.model('Expenses',expenseSchema)

module.exports= ExpenseModel