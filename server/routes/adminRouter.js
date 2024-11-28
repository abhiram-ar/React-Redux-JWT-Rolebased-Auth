const express = require("express");
const userModal = require("../models/userModal");
const router = express.Router();

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
        return res
            .status(500)
            .json({
                success: false,
                message: "internal error: unable to reterive user details",
            });
    }
});

module.exports = router;
