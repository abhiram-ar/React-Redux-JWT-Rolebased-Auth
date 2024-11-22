require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db.js");
const authRouter = require("./routes/authRouter.js")
const verifyJWT = require("./middlewares/verifyJWT.js")
const refresh = require("./controllers/refresh.js");
const cookieParser = require("cookie-parser");

//app initailization
dbConnect()
const app = express();

//middlewares
app.use(cookieParser())
app.use(express.json())


app.get( "/", (req, res) => {
    res.send("hello world");
});

app.post("/refresh", refresh)

//official rotues
app.use("/auth", authRouter)

//protected rotues
app.use(verifyJWT)
app.get("/home", (req, res)=>{
    res.send("home")
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`sever is listening on port: ${PORT}`);
});
