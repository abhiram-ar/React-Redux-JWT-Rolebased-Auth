const express = require("express");

const router = express.Router();

router.get("/signup", (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    console.log(req.body);

    //validate credentials and reject if invalid
    


    res.send("singup");
});

module.exports = router;
