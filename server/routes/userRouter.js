const express = require("express");
const userModal = require("../models/userModal");
const router = express.Router();
const cloudinary = require("./../config/cloudinary");
const { upload } = require("./../config/multerConfig");

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

router.patch("/updateProfilePic", upload.single("image"), async (req, res) => {
    console.log("naem", req.file);
    console.log("update profile hit");

    try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        console.log("cloudinary: image upload Sucessfull");
        console.log(uploadResult);
        const result = await userModal.findByIdAndUpdate(res.user.id, {
            profilePicURL: uploadResult.url,
        });


        return res
            .status(200)
            .json({
                success: true,
                message: "file upload sucessful and updatedDB",
                profilePicPublicURL: upload.url,
            });
    } catch (error) {
        console.log("cloudinary: error while uploading image");
        console.log(error);
        res.status(400).json({ sucess: false, message: "failed to save profile pic" });
    }

});

module.exports = router;
