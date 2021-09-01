const jwt = require("jsonwebtoken");
const pool = require("./database");

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}


function generateRefreshToken(user){
    const refresh = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    const query = "INSERT INTO `tokens` (token) VALUES(?)";
    pool.query(query, refresh);
    return refresh;
}


async function doesRefreshTokenExist(token){
    const query = "SELECT token FROM tokens WHERE token=?";
    const rows = await pool.query(query,token);
    return rows != null && rows.length > 0;
}

function verify(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err)
            return null;
        return user;
    });
}

async function verifyRefresh(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {generateAccessToken : generateAccessToken, generateRefreshToken : generateRefreshToken, doesRefreshTokenExist: doesRefreshTokenExist, verify:verify, verifyRefresh: verifyRefresh};