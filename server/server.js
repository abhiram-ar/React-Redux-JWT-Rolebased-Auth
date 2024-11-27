require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db.js");
const authRouter = require("./routes/authRouter.js");
const verifyJWT = require("./middlewares/verifyJWT.js");
const refresh = require("./controllers/refresh.js");
const logoutController = require("./controllers/logoutController.js");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRouter.js")

//app initailization
dbConnect();
const app = express();

//middlewares
app.use(
    cors({
        origin: ["http://127.0.0.1:5173","http://127.0.0.1:4173","http://localhost:5173" ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/refresh", refresh);

//official rotues
app.use("/auth", authRouter);

//protected rotues
app.use(verifyJWT);
app.get("/home", (req, res) => {
    res.send("home");
});
app.use("/user",userRouter )

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`sever is listening on port: ${PORT}`);
});
