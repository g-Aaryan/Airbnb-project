const dotenv = require('dotenv');

// config.js file is used to load environment variables from a .env file and export the database configuration for Sequelize

dotenv.config();
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
}

module.exports = config;
