const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/userModal");
const RefreshTokenModel = require("./../models/jwtModel");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { error } = require("console");

const router = express.Router();
const userAuthSchema = z.object({
    username: z
        .string()
        .min(5, { message: "username should contain 5 or more characters" })
        .optional(),
    email: z.string().email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(8, { message: "password should contain atlest 8 characters" }),
    isAdmin: z.boolean().optional(),
});

router.post("/signup", async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    //validate credentials and reject if invalid
    const user = userAuthSchema.safeParse({
        username,
        email,
        password,
        isAdmin,
    });
    if (!user.success) {
        console.log("invalid user credentials");
        return res.status(400).json(user.error);
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashedpassword,
        isAdmin,
    });
    try {
        await newUser.save();
        console.log("user saved sucessful");
    } catch (error) {
        console.log(`saving user failed`);
        return res.status(400).json({ success: "failed" });
    }

    res.status(201).json({ success: true });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const fetchedUser = await UserModel.findOne({ email: email });
    console.log(fetchedUser);

    if (!fetchedUser) {
        return res
            .status(404)
            .json({ success: false, message: "User not found." });
    }

    if (!(await bcrypt.compare(password, fetchedUser.password))) {
        return res
            .status(401)
            .json({ success: false, message: "Invaid password" });
    }

    //user is valid - provide access token and refresh token
    const payload = {
        id: fetchedUser._id,
        username: fetchedUser.username,
        isadmin: fetchedUser.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRECT, {
        expiresIn: "3m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRECT, {
        expiresIn: "1d",
    });
    //save refreshToken in DB

    res.cookie("refreshJWT", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, //1 day
    });

    try {
        await new RefreshTokenModel({
            userID: fetchedUser._id,
            username: fetchedUser.username,
            token: refreshToken,
        }).save();
    } catch (error) {
        console.log(`error while saving refresh token to DB`);
        console.log(error);
        return res.status(500).json({success:false, message:"error while saving JWT to DBF"})
    }

    res.json(accessToken);
});

module.exports = router;
