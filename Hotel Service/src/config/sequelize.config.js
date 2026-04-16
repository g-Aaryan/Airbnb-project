require('ts-node/register'); 
// to enable typescript support for sequelize-cli
// sequelize.config.js file is used to load the database configuration from db.config.js and export it for use in the application and by Sequelize CLI
const config = require('./db.config');
module.exports = config;
