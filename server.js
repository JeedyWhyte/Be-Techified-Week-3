const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const validateEnvVars = require('./src/config/env');

validateEnvVars();

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});