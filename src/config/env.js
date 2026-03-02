require('dotenv').config();

const requiredEnvVars = [
    'PORT',
    'MONGODB_URI'
];

const validateEnvVars = () => {
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
        process.exit(1);
    }

    console.log('All required environment variables are set.');
    
    return {
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI
    };
};

module.exports = validateEnvVars();