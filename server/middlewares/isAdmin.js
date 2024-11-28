const isAdmin = (req, res, next) => {
    if (res.user.isAdmin) {
        return next();
    }
    res.status(403).json({
        success: false,
        message: "dont have privilage to access this route",
    });
};

module.exports = isAdmin;
