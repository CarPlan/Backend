const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();    
const bcrypt = require("bcrypt");
const jwt_helper = require("./../helpers/jwt_helper");
const { query } = require("../helpers/database");

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
                    const access = jwt_helper.generateAccessToken(user);
                    const refresh = jwt_helper.generateRefreshToken(user);

                    res.status(200).json({accessToke : access, refreshToken: refresh});
                    return;
                }else{
                    res.sendStatus(403);
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
                    const access = jwt_helper.generateAccessToken(user);
                    const refresh = jwt_helper.generateRefreshToken(user);
                    res.status(200).json({accessToke : access, refreshToken: refresh});
                    return;
                }else{
                    res.sendStatus(403);
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

router.post("/token", async (req, res) =>  {
    const refresh = req.body.refreshToken;
    if(refresh == null){
        res.sendStatus(401);
        return;
    }
    if(!await jwt_helper.doesRefreshTokenExist(refresh)){
        res.sendStatus(403);
        return;
    }

    const user = await jwt_helper.verifyRefresh(refresh);
    if(user == null){
        res.sendStatus(403);
        return;
    }

    res.status(200).json({accessToke: jwt_helper.generateAccessToken({name : user.name})})
});

router.delete("/logout", (req, res) => {
    if(req.body.refreshToken == null){
        res.sendStatus(400);
        return;
    }
    const query = "DELETE FROM tokens WHERE token=?";
    pool.query(query, [req.body.refreshToken]);
    res.sendStatus(204);
})

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