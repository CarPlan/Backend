const pool = require("./database");
const {getUserFrom} = require("./user");

async function getPermission(id){

    const user = await getUserFrom(id);

    if(user == null)
        return
    
    return user.permission.split(",");
    
}

module.exports = getPermission;
