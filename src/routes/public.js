const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();    
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    if(req.body.name != null){
        const query = "SELECT id, email, password, created_at FROM user WHERE name=?";
        const rows = await pool.query(query, req.body.name);
        if(rows != ""){
            try
            {
                if(await bcrypt.compare(req.body.password, rows[0].password)){
                    
                    const user = {
                        name : req.body.name
                    };
                    const access = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                    res.status(200).json({accessToke : access});
                    return;
                }else{
                    res.send("not allowed");
                    return;
                }

            }catch (err) {
                console.log(err);
                res.status(500).send();
                return;
            }
        }else{
            res.status(400).send("User does not exist");
            return;
        }
    }else if(req.body.email != null){
        const query = "SELECT id, email, password, created_at FROM user WHERE email=?";
        const rows = await pool.query(query, req.body.email);
        if(rows != ""){
            try
            {
                if(await bcrypt.compare(req.body.password, rows[0].password)){
                    const user = {
                        name : rows[0].name
                    };
                    const access = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                    res.status(200).json({accessToke : access});
                    return;
                }else{
                    res.send("not allowed");
                    return;
                }

            }catch (err) {
                console.log(err);
                res.status(500).send();
                return;
            }
        }else{
            res.status(400).send("User does not exist");
            return;
        }
    }

    res.status(400).send("Invalid");
});

if(process.env.DEBUG){
    router.post("/create", async (req, res) => {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);


            const query = "INSERT INTO `user` (email, password, name) VALUES(?, ?, ?)";

            pool.query(query,[req.body.email, hashedPassword, req.body.name]);
            res.status(200).send();
        }catch (err) {
            res.status(500).send();
        }
        
        
    });
}

module.exports = router;