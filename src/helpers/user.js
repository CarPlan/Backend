const pool = require("./database");
const { getUserFromCache, cacheUser } = require("./redis");

async function getUserFromDB(id){
    const query = "SELECT id, email, password, created_at, permission FROM user WHERE id=?";
    const rows = await pool.query(query, id);
    if(rows == null)
        return null;
    return rows[0];
}

async function getUserFromDBByName(name){
    const query = "SELECT id, email, password, created_at, permission FROM user WHERE name=?";
    const rows = await pool.query(query, name);
    if(rows == null)
        return null;
    return rows[0];
}

async function getUserFromDBByEmail(email){
    const query = "SELECT id, email, password, created_at, permission FROM user WHERE email=?";
    const rows = await pool.query(query, email);
    if(rows == null)
        return null;
    return rows[0];
}

async function getUserFrom(id){
    const cache = await getUserFromCache(id);
    if(cache == null){
        const user = await getUserFromDB(id);
        cacheUser(user);
        return  user;
    }
    return cache;
}

async function updateUser(id){
    cacheUser(await getUserFromDB(id));
}



module.exports = {getUserFromDB: getUserFromDB, getUserFrom: getUserFrom, updateUser: updateUser, getUserFromDBByEmail: getUserFromDBByEmail, getUserFromDBByName: getUserFromDBByName};