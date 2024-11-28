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

module.exports = router;
