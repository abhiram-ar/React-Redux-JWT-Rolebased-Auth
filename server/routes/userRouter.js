const express = require("express");
const userModal = require("../models/userModal");
const { route } = require("./authRouter");
const router = express.Router();

router.get("/profile", async (req, res) => {
    const user = res.user;
    try {
        const userDetails = await userModal.findById(user.id);
        const responseData = {
            username: userDetails.username,
            email: userDetails.email,
            profilePicURL: userDetails.profilePicURL ?? "",
        };
        return res.status(200).json(responseData);
    } catch (error) {
        console.assert(false, "user/profile: unable to find user details");
        return res
            .status(404)
            .json({ sucess: false, message: "unable to fetch userDetails" });
    }
});

router.patch("/updateProfilePic", (req, res)=>{
    console.log("update profile hit");
    res.status(200).json({sucess: true, message: "updates"})
})

module.exports = router;
