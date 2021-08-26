const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();    
const bcrypt = require("bcrypt");

router.post("/user/get", async (req, res) => {
    if(req.body.name != null){
        const querry = "SELECT id, email, password, created_at FROM user WHERE name=?";
        const rows = await pool.query(querry, req.body.name);
        if(rows != ""){
            try
            {
                if(await bcrypt.compare(req.body.password, rows[0].password)){
                    res.send("succses");
                    return;
                }else{
                    res.send("not allowed");
                    return;
                }

            }catch (err) {
                res.status(500).send();
            }
        }else{
            res.status(400).send("User does not exisit");
        }
    }else if(req.body.email != null){
        const querry = "SELECT id, email, password, created_at FROM user WHERE email=?";
        const rows = await pool.query(querry, req.body.email);
        if(rows != ""){
            try
            {
                if(await bcrypt.compare(req.body.password, rows[0].password)){
                    res.send("succses");
                    return;
                }else{
                    res.send("not allowed");
                    return;
                }

            }catch (err) {
                res.status(500).send();
            }
        }else{
            res.status(400).send("User does not exisit");
        }
    }

    res.status(400).send("Invalide");
});

router.post("/user/create", async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const querry = "INSERT INTO `user` (email, password, name) VALUES(?, ?, ?)";

        pool.query(querry,[req.body.email, hashedPassword, req.body.name]);
        res.status(200).send();
    }catch (err) {
        res.status(500).send();
    }
    
    
});

module.exports = router;