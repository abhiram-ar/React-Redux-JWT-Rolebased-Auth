const { createVerify } = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth)
        return res
            .status(401)
            .json({ success: false, message: "not authentication header" });

    let token = auth.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, decoded) => {
        if (err) {
            console.log(`JWT error : ${err.name}`);
            return res
                .status(403)
                .json({ success: false, message: err.message });
        }
        console.log(`Decoded JWT user-:`,decoded);
        res.user = decoded;
        next();
    });
};

module.exports = verifyJWT;
