const express = require("express");
const getPermission = require('./../helpers/permission');

const router = express.Router();  

router.get("/auth", (req, res) => {
    if(req.user == null){
        res.sendStatus(401);
        return;
    }

    else res.status(200).send(req.user);
});

router.get("/permission", async (req, res) => {
    if(req.user == null){
        res.sendStatus(401);
        return;
    }

    else {
        const permissions = await getPermission(req.user);
        res.status(200).send(permissions == null ? "none" : permissions);
    }
});

module.exports = router;