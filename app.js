require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const validateTodo = require('./middlewares/validator');
const patchValidator = require('./middlewares/patchValidator');
const connectDB = require('./database/db');
const Todo = require('./models/todo.model');

// Connect to the database
connectDB();

const app = express();

PORT = process.env.PORT

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors('*'));
app.use(logRequest);



//
app.get('/todos/completed', async (req, res, next) => {
    try {
        const completed = await Todo.find({ completed: true });
        res.status(200).json(completed);
    } catch (error) {
        next(error);
    }
})

app.get('/todos/pending', async (req, res, next) => {
    try {
        const pending = await Todo.find({ completed: false });
        res.json(pending);
    } catch (error) {
        next(error);
    }
})

//Get Request - Read all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.status(200).json(todos); // Get all todos
});

app.get('/todos/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo); // Get todo by ID
    } catch (error) {
        next(error);
    }
});

//Post Request - Create a new todo
app.post('/todos', validateTodo, async (req, res, next) => {
    const newTodo = new Todo ({
        task: req.body.task,
        completed: req.body.completed
    })
    await newTodo.save();
    try {
        res.status(201).json(newTodo); // Return the created todo
    } catch (error) {
        next(error);
    }
})

// PATCH Request - Update a todo
app.patch('/todos/:id', patchValidator, async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo); // Return the updated todo
    } catch (error) {
        next(error);
    }
})

// DELETE Request - Delete a todo
app.delete('/todos/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error!' })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})