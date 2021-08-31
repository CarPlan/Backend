const pool = require('../src/helpers/database');
const bcrypt = require("bcrypt");

async function createDefaultUser(){
    if(process.env.DEBUG == 1){
        try{
            const hashedPassword = await bcrypt.hash("1234", 10);
    
            const query = "INSERT INTO `user` (email, password, name, permission) VALUES('admin@example.com',?, 'admin', 'R,W,A')";
        await  pool.query(query, hashedPassword);

    
        }catch (err) {
            console.log("Could not create admin user: "  + err);
        }
        
    }
}

module.exports = createDefaultUser;