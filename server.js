const express = require("express");
const app = express();
const db = require("./dp");
const cors = require("cors");   
app.use(express.json());
app.use(cors());



app.listen(8800, () => {
    console.log("Backend server is running!");
});