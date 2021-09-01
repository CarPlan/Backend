CREATE TABLE Backend.tokens (
    id INT auto_increment NOT NULL,
	token varchar(200) NOT NULL,
	CONSTRAINT tokens_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

