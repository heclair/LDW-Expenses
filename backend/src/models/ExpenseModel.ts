const mongoose = require('mongoose');

// Definindo o schema de ExpenseModel
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,  // Remove espaços em branco nas extremidades
  },
  amount: {
    type: Number,
    required: true,
    min:0,  // Garante que o valor seja positivo
  },
  date: {
    type: Date,
    required: true,
  }
});

// Criando o modelo baseado no schema
const ExpenseModel = mongoose.model('Expense', expenseSchema);

export default ExpenseModel
