const pool = require('./../src/helpers/database');

const query = "CREATE TABLE Backend.`user` ( id INT auto_increment NOT NULL, email varchar(100) NOT NULL, password varchar(100) NOT NULL, name varchar(100) NOT NULL, permission varchar(10) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CONSTRAINT user_PK PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";

async function createTables(){
    await pool.query(query);
}

module.exports = createTables;