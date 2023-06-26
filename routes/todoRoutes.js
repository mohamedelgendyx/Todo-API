const router = require('express').Router();

const todoController = require('../controllers/todoController');

router.route('/todo/:user_id')
    .post(todoController.addNewTodo)
    .get(todoController.getAllUserTodos)

router.route('/todo/:user_id/:todo_id')
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo)


module.exports = router;