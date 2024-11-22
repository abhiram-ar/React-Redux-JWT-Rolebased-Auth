const RefreshTokenModel = require("./../models/jwtModel");

const logout = async (req, res) => {
    const { refreshJWT } = req.cookies;
    if (!refreshJWT) {
        console.assert(false, "logout: refresh token not found in cookies");
        return res.sendStatus(204);
    }
    const fetchedTokenDetails = await RefreshTokenModel.find({
        token: refreshJWT,
    });

    if (!fetchedTokenDetails) {
        console.assert(false, "logout: cannot find refresh token in DB");
        console.assert(false, "requesting client to clear 'refreshJWT' cookie");
        res.clearCookie("refreshJWT", { httpOnly: true });
        res.sendStatus(204);
    }

    try {
        await RefreshTokenModel.deleteOne({ token: refreshJWT });
        console.log(`logout: refresh token deleted from DB`);
        res.clearCookie("refreshJWT", { httpOnly: true });
        res.status(200).send({
            sucess: true,
            message: "user logged out sucessfully",
        });
        //also in frontend delete the refresh cookie and acces token in memory
    } catch (error) {
        console.error("logout: failed to delete refresh token from database");
        return res
            .status(500)
            .json({ sucess: false, message: "failed to logout user" });
    }
};

module.exports = logout;
