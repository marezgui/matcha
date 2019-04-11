/* Create database named 'matcha' AND execute the following code */

-- -----------------------------------------------------
-- Schema matcha
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS matcha ;

-- -----------------------------------------------------
-- Schema matcha
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS matcha ;--DEFAULT CHARACTER SET utf8 ;
--USE matcha ;

-- -----------------------------------------------------
-- Table matche
-- -----------------------------------------------------
DROP TABLE IF EXISTS matche ;

CREATE TABLE IF NOT EXISTS matche (
	idmatche SERIAL PRIMARY KEY,
	users_id_1 INT NOT NULL,
	users_id_2 INT NOT NULL,
	FOREIGN KEY (users_id_1) REFERENCES users (id),
	FOREIGN KEY (users_id_2) REFERENCES users (id));

-- -----------------------------------------------------
-- Table notification
-- -----------------------------------------------------
DROP TABLE IF EXISTS notification ;

CREATE TABLE IF NOT EXISTS notification (
	id SERIAL PRIMARY KEY,
	read INT NULL,
	message VARCHAR(255) NULL,
	users_id INT NOT NULL,
	FOREIGN KEY (users_id) REFERENCES users (id));

-- -----------------------------------------------------
-- Table tag
-- -----------------------------------------------------
DROP TABLE IF EXISTS tag ;

CREATE TABLE IF NOT EXISTS tag (
	id SERIAL PRIMARY KEY,
	word VARCHAR(45) NULL,
	value INT NULL);


-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
DROP TABLE IF EXISTS users ;

CREATE TYPE GENRE AS ENUM ('Homme', 'Femme');
CREATE TYPE ORIENTATION AS ENUM ('Homme', 'Femme', 'Bisexuel');

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	firstName varchar (255) NOT NULL,
	lastName varchar (255) NOT NULL,
	mail varchar(255) NOT NULL,
	login varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	notifications boolean DEFAULT '1',
	registrationDate TIMESTAMP DEFAULT NOW(),
	activate boolean DEFAULT '0',
	confirmKey varchar(255) NOT NULL,
	restoreKey varchar(255) DEFAULT NULL,
	bio TEXT,
	genre GENRE,
	dateOfBirth DATE,
	orientation ORIENTATION,
	location JSON,
	photo JSON,
	score integer DEFAULT 0);


-- -----------------------------------------------------
-- Table vues
-- -----------------------------------------------------
DROP TABLE IF EXISTS vues ;

CREATE TABLE IF NOT EXISTS vues (
	idmatche SERIAL PRIMARY KEY,
	users_id_1 INT NOT NULL,
	users_id_2 INT NOT NULL,
	FOREIGN KEY (users_id_1) REFERENCES users (id),
	FOREIGN KEY (users_id_2) REFERENCES users (id));

-- -----------------------------------------------------
-- Table chatroom
-- -----------------------------------------------------
DROP TABLE IF EXISTS chatroom ;

CREATE TABLE IF NOT EXISTS chatroom (
	idchatroom SERIAL PRIMARY KEY,
	matche_idmatche INT NOT NULL,
	FOREIGN KEY (matche_idmatche) REFERENCES matche (idmatche));


-- -----------------------------------------------------
-- Table userstag
-- -----------------------------------------------------
DROP TABLE IF EXISTS userstag ;

CREATE TABLE IF NOT EXISTS userstag (
	id SERIAL PRIMARY KEY,
	idtag INT NOT NULL,
	users_id INT NOT NULL,
	FOREIGN KEY (idtag) REFERENCES tag (id),
	FOREIGN KEY (users_id) REFERENCES users (id));



-- Add users de test :
INSERT INTO users
	(firstname, lastname, mail, login, password, confirmKey)
VALUES
	'Doe', 'John', 'john.doe@gmail.com', 'jdoe', '$2y$10$YImWH8WPvzktL4WahZbxAOjxbHRWHyquWibbMQggw2wP7rwXSvz/u', '178345647515454');

