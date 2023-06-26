const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');

exports.addNewTodo = async (request, response, next) => {
    try {
        const userTodos = await Todo.findOne({ user: request.params.user_id }, { user: 1 });
        if (!userTodos) {
            const newTodo = new Todo({
                user: request.params.user_id,
                todoItems: []
            })
            await newTodo.save();
        }
        const newUserTodo = await Todo.findOneAndUpdate(
            { user: request.params.user_id },
            { $push: { todoItems: request.body } },
            { new: true });
        response.status(201).json({ message: 'Todo added successfully', data: newUserTodo });
    } catch (error) { next(error); }
}

exports.updateTodo = async (request, response, next) => {
    try {
        const userTodos = await Todo.findOne({ user: request.params.user_id });
        if (userTodos) {
            const targetTodo = userTodos.todoItems.find(({ _id }) => String(_id) === request.params.todo_id);
            if (targetTodo) {

                targetTodo.todoDetails = request.body?.todoDetails;
                targetTodo.completed = request.body?.completed ?? false;
                await userTodos.save();
                response.status(200).json({ message: 'Todo updated successfully', data: userTodos });
            }
            else {
                throw Object.assign(new Error('Todo not found'), { status: 404 });
            }
        }
        else {
            throw Object.assign(new Error('User Todos not found'), { status: 404 });
        }
    } catch (error) { next(error); }
}

exports.deleteTodo = async (request, response, next) => {
    try {
        const userTodos = await Todo.findOne({ user: request.params.user_id });
        if (userTodos) {
            userTodos.todoItems = userTodos.todoItems.filter(({ _id }) => String(_id) !== request.params.todo_id);
            await userTodos.save();
            response.status(200).json({ message: 'Todo deleted successfully', data: userTodos });
        }
        else {
            throw Object.assign(new Error('Todo not found'), { status: 404 });
        }
    } catch (error) { next(error); }
}

exports.getUserTodoDetails = async (request, response, next) => {
    try {
        const userTodoItems = await Todo.findOne({ user: request.params.user_id }, { todoItems: 1 });
        if (userTodoItems) {
            const userTodo = userTodoItems.todoItems.find(({ _id }) => String(_id) === request.params.todo_id);
            if (userTodo)
                response.status(200).json({ message: 'Todo retrieved successfully', data: userTodo });
            else
                throw Object.assign(new Error('Todo not found'), { status: 404 });
        }
        else {
            throw Object.assign(new Error('User Todos not found'), { status: 404 });
        }
    } catch (error) { next(error); }
}

exports.getAllUserTodos = async (request, response, next) => {
    try {
        const userTodo = await Todo.findOne({ user: request.params.user_id });
        if (userTodo) {
            response.status(200).json({ message: 'Todos retrieved successfully', data: userTodo.todoItems });
        }
        else {
            throw Object.assign(new Error('User Todos not found'), { status: 404 });
        }
    } catch (error) { next(error); }
}