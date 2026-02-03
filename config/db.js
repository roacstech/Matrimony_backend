// const mysql = require("mysql2/promise");
// require("dotenv").config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// console.log("✅ MySQL pool created");

// module.exports = db;



const knex = require("knex");
const knexConfig = require("../utils/knexFile");

// explicitly choose environment
const environment = process.env.NODE_ENV || "development";

const db = knex(knexConfig[environment]);

if(db){
  console.log("Db Connected SuccessFully!😂")
}


module.exports = db;
