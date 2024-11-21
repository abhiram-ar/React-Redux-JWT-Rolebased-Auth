const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/userModal");
const { z, string } = require("zod");

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

module.exports = router;
