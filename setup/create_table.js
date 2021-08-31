const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

pool.getConnection((err, connection) => {
    if(err){
        console.log(err);
    }

    if(connection) connection.release();

    return;
});

const querry = "CREATE TABLE Backend.`user` ( id INT auto_increment NOT NULL, email varchar(100) NOT NULL, password varchar(100) NOT NULL, name varchar(100) NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CONSTRAINT user_PK PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";

function createTables(){
    pool.query(querry);
}

module.exports = createTables;