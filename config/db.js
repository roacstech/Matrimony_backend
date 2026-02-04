


const knex = require("knex");
const knexConfig = require("../utils/knexFile");

// explicitly choose environment
const environment = process.env.NODE_ENV || "development";

const db = knex(knexConfig[environment]);

if(db){
  console.log("Db Connected SuccessFully!😂")
}


module.exports = db;
