const knex = require("knex");
const knexConfig = require("../utils/knexFile");

const environment = process.env.NODE_ENV || "OTDEV";

console.log("Using DB Environment:", environment);

const db = knex(knexConfig[environment]);

db.raw("select 1+1 as result")
  .then(() => console.log("Db Connected SuccessFully! 😂"))
  .catch(err => console.error("DB Connection Error:", err));

module.exports = db;