const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();    
const bcrypt = require("bcrypt");
const { cacheUser } = require("../helpers/redis");
const {getUserFromDBByEmail, getUserFromDBByName} = require("../helpers/user");

router.post("/login", async (req, res) => {
    if(req.body.name != null){
       const user = await getUserFromDBByName(req.body.name)
       if(user != null){
            try
            {
                if(await bcrypt.compare(req.body.password, user.password)){
                    
                    cacheUser(user);
                    req.session.user = user;

                    res.sendStatus(200);
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
        const user = await getUserFromDBByEmail(req.body.email)
        if(user != null){
            try
            {
                if(await bcrypt.compare(req.body.password, user.password)){
                    cacheUser(user);
                    req.session.user = user;

                    res.sendStatus(200);
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

router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
        res.sendStatus(500);
        return;
        }
        
        res.clearCookie("sid");
        res.sendStatus(200);
    });
})

module.exports = router;