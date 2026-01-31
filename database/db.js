const mongoose = require('mongoose');


const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@todos.wnbqyqu.mongodb.net/?appName=Todos`)
        console.log('Database connected successfully');
    }catch(error){
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;