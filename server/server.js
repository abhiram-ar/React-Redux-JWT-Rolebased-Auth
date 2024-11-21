const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db.js");

dbConnect()
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`sever is listening on port: ${PORT}`);
});
