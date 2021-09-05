const express = require("express");
const { getUserFrom } = require("../helpers/user");
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
        const permission = await getPermission(req.user.id)
        res.status(200).send(permission == null ? "none" : permission);
    }
});

module.exports = router;