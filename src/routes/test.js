const express = require("express");

const router = express.Router();  

router.get("/auth", (req, res) => {
    if(req.user == null){
        res.sendStatus(401);
        return;
    }

    else res.status(200).send(req.user);
})

module.exports = router;