const express = require('express');
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const todoRoutes = require('./routes/todo.routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Logger middleware
app.use(logRequest);

// API Routes
app.use('/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error!' });
});

module.exports = app;