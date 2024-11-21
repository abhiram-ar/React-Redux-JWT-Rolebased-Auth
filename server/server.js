require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db.js");
const authRouter = require("./routes/authRouter.js")

//app initailization
dbConnect()
const app = express();

//middlewares
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world");
});

//official rotues
app.use("/auth", authRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`sever is listening on port: ${PORT}`);
});
