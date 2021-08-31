const pool = require("./database");

async function getPermission(user){

    const query = "SELECT permission FROM user WHERE name=?";

    const rows = await pool.query(query, user.name);

    if(rows == null || rows[0] == null ||rows[0].permission == null)
        return null;
    
    return rows[0].permission.split(",");
    
}

module.exports = getPermission;
