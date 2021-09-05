const express = require("express");
const getPermission = require("./../helpers/permission");
const pool = require("./../helpers/database");
const { updateUser } = require("../helpers/user");

const router = express.Router();


router.patch("/update/permissions", async (req, res) => {

    const permission = await getPermission(req.user.id);

    if(permission == null || !permission.includes('A')){
        res.sendStatus(403);
        return;
    }

    if(req.body.permissions == null){
        res.sendStatus(400);
        return;
    }

    let permissions = "";
    req.body.permissions.forEach(current => {
        permissions += current + ",";
    });

    if(permissions == ""){
        res.sendStatus(400);
        return;
    }

    permissions = permissions.substring(0, permissions.length  - 1)

    if(req.body.name != null){
        const query = "UPDATE `user` SET permission=? WHERE name=?;"
        pool.query(query, [permissions, req.body.name]);
        updateUser(req.user.id);
        res.sendStatus(200);
        return;
    }

    if(req.body.email != null){
        const query = "UPDATE `user` SET permission=? WHERE email=?;"
        pool.query(query, [permissions, req.body.email]);      
        updateUser(req.user.id);
        res.sendStatus(200);
        return;
    }

    res.sendStatus(400);
});

router.post("/create", async (req, res) => {

    const permission = await getPermission(req.user.id);

    if(permission == null || !permission.includes('A')){
        res.sendStatus(403);
        return;
    }

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const query = "INSERT INTO `user` (email, password, name) VALUES(?, ?, ?)";

        pool.query(query,[req.body.email, hashedPassword, req.body.name]);
        res.status(200).send();
    }catch (err) {
        res.status(500).send();
    }
    
    
});

module.exports = router;