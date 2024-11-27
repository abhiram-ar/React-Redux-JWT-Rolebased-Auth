const jwt = require("jsonwebtoken");
const RefreshTokenModel = require("./../models/jwtModel");
const UserModel = require("./../models/userModal");

const refresh = async (req, res) => {
    console.log(`hit: refersh route`);
    const { refreshJWT } = req.cookies;
    if (!refreshJWT) {
        return res
            .status(401)
            .json({ success: false, message: "No refresh token" });
    }

    const fetchedTokenDetails = await RefreshTokenModel.findOne({
        token: refreshJWT,
    });

    if (!fetchedTokenDetails) {
        // the cookie needs to be identical in name and option, for browser to clear them
        // maxAge and expires is an exception
        res.clearCookie("refreshJWT", { httpOnly: true });
        return res.status(403).send("refresh token not found in DB");
    }

    jwt.verify(
        refreshJWT,
        process.env.REFRESH_TOKEN_SECRECT,
        async (error, decoded) => {
            if (error) {
                console.log(`error while verifying refresh token : `, err.name);
                return res.status(403).json({
                    success: false,
                    message: error.message,
                });
            }
            try {
                console.log(decoded);
                const fetchedUser = await UserModel.findById(decoded.id);

                const payload = {
                    id: fetchedUser._id,
                    username: fetchedUser.username,
                    isAdmin: fetchedUser.isAdmin,
                };

                const newAccessToken = jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_SECRECT,
                    { expiresIn: "3m" }
                );

                return res.status(200).json(newAccessToken);
            } catch (error) {
                console.log(`refreshing token: user not found`);
                console.log(error);
                return res
                    .status(403)
                    .json({ sucess: false, message: "user not found in DB" });
            }
        }
    );
};

module.exports = refresh;
