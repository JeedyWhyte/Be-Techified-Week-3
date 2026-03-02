const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controllers');
const validateTodo = require('../middlewares/validator');
const patchValidator = require('../middlewares/patchValidator');


// Get all todos
router.get('/', todoController.getAllTodos);

// Get completed todos
router.get('/completed', todoController.getCompletedTodos);

// Get pending todos
router.get('/pending', todoController.getPendingTodos);

// Get todo by ID
router.get('/:id', todoController.getTodoById);

// Create a new todo
router.post('/', validateTodo, todoController.createTodo);

// Update a todo
router.patch('/:id', patchValidator, todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;