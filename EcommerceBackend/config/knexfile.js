require("dotenv").config(); // ✅ Load .env variables

const knex = require("knex")({
  client: "mysql2", // ✅ Use "mysql2" instead of "mysql"
  connection: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
  },
});

module.exports = knex;
