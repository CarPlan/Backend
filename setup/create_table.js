const pool = require('./../src/helpers/database');
const fs = require('fs')


async function createTables(){
    await createUserTable();
}

async function createUserTable(){
    const query = fs.readFileSync("./setup/create_table_user.sql").toString();
    await pool.query(query);
}

module.exports = createTables;