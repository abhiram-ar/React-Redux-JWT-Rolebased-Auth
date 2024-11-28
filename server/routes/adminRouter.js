const express = require("express");
const userModal = require("../models/userModal");
const router = express.Router();
const { z } = require("zod");

router.get("/test", (req, res) => {
    res.send("hello");
});

router.get("/users", async (req, res) => {
    try {
        const users = await userModal.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.assert(
            false,
            "admin/users: error while fetching users from DB"
        );
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal error: unable to reterive user details",
        });
    }
});

router.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const result = await userModal.findByIdAndDelete(id);
        console.log(result);
        return res
            .status(200)
            .json({ sucess: false, message: "user sucesfully deleted" });
    } catch (error) {
        console.assert(
            false,
            "delete.admin/user: Unable to delete user from Database"
        );
        return res
            .status(500)
            .json({ success: false, message: "unable to delete user" });
    }
});

const userUpdateSchema = z.object({
    username: z
        .string()
        .min(3, { message: "username should contain 3 or more characters" })
        .optional(),
    email: z.string().email({ message: "Invalid email address" }),
});

router.patch("/user/:id", async (req, res) => {
    const { username, email, _id: id } = req.body;

    //validate credentials and reject if invalid
    const userUpdateDetails = userUpdateSchema.safeParse({
        username: username.trim(),
        email: email.trim(),
    });

    if (!userUpdateDetails.success) {
        console.log("patch.auth/user: invalid user credentials");
        return res.status(400).json(user.error);
    }

    try {
        console.log(userUpdateDetails);
        const update = await userModal.findByIdAndUpdate(
            id,
            userUpdateDetails.data
        );
        return res
            .status(200)
            .json({
                success: true,
                message: "user details updated sucessfully",
            });
    } catch (error) {
        console.assert(
            false,
            "patch.auth/user: error while updating userDetails"
        );
        console.log(error);
        return res
            .status(500)
            .json({ sucess: false, message: "error while updating user" });
    }
});

module.exports = router;
