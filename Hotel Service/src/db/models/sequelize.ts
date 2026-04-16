import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/index";

const sequelize = new Sequelize({ // db instance is created using the Sequelize constructor, which takes the database configuration as an argument
    dialect: "mysql",
    host: dbConfig.DB_HOST,
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    logging: true // prints SQL queries to the console for debugging purposes
});

export default sequelize;
