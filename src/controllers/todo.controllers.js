const Todo = require('../models/todo.model');

// Get all todos
const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

// Get completed todos
const getCompletedTodos = async (req, res, next) => {
    try {
        const completed = await Todo.find({ completed: true });
        res.status(200).json(completed);
    } catch (error) {
        next(error);
    }
};

// Get pending todos
const getPendingTodos = async (req, res, next) => {
    try {
        const pending = await Todo.find({ completed: false });
        res.status(200).json(pending);
    } catch (error) {
        next(error);
    }
};

// Get todo by ID
const getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

// Create a new todo
const createTodo = async (req, res, next) => {
    try {
        const newTodo = new Todo({
        task: req.body.task,
            completed: req.body.completed || false
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

// Update a todo
const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

// Delete a todo
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTodos,
    getCompletedTodos,
    getPendingTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};