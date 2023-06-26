const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    todoDetails: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    todoItems: [todoItemSchema]
})


mongoose.model('Todo', todoSchema);