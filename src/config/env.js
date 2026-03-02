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
    
};

// export the function reference so consumers can call it
module.exports = validateEnvVars;