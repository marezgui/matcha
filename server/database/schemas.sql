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
-- Table users
-- -----------------------------------------------------

CREATE TYPE GENRE AS ENUM ('M', 'W', 'O');
CREATE TYPE ORIENTATION AS ENUM ('M', 'W', 'BI');

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
  iduser SERIAL PRIMARY KEY,
  mail VARCHAR(255) NULL,
  password VARCHAR(255) NULL,
  username VARCHAR(255) NULL,
  firstName VARCHAR(255) NULL,
  lastName VARCHAR(255) NULL,
  bio VARCHAR(255) NULL,
  genre GENRE DEFAULT 'O',
  orientation ORIENTATION DEFAULT 'BI',
  dateOfBirth DATE NULL,
  registrationDate TIMESTAMP DEFAULT NOW(),
  activate boolean DEFAULT '0',
  notifications boolean DEFAULT '1',
  confirmKey VARCHAR(255) NULL,
  restoreKey VARCHAR(255) NULL,
  score INT DEFAULT '0',
  report INT DEFAULT '0',
  connexionLog DATE NULL,
  location JSON NULL,
  photo JSON NULL);


-- -----------------------------------------------------
-- Table chat
-- -----------------------------------------------------
DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE IF NOT EXISTS chat (
  idchat SERIAL PRIMARY KEY,
  userId1 INT NOT NULL,
  userId2 INT NOT NULL,
  FOREIGN KEY (userId1) REFERENCES users (iduser),
  FOREIGN KEY (userId2) REFERENCES users (iduser));


-- -----------------------------------------------------
-- Table matche
-- -----------------------------------------------------
DROP TABLE IF EXISTS matche CASCADE;

CREATE TABLE IF NOT EXISTS matche (
  idmatche INT NOT NULL,
  userId1 INT NOT NULL,
  userId2 INT NOT NULL,
  matchDate TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (userId1) REFERENCES users (iduser),
  FOREIGN KEY (userId2) REFERENCES users (iduser),
  PRIMARY KEY (idmatche));


-- -----------------------------------------------------
-- Table vues
-- -----------------------------------------------------
DROP TABLE IF EXISTS vues CASCADE;

CREATE TABLE IF NOT EXISTS vues (
  idvues SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  vueUserId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (iduser),
  FOREIGN KEY (vueUserId) REFERENCES users (iduser));


-- -----------------------------------------------------
-- Table notification
-- -----------------------------------------------------
DROP TABLE IF EXISTS notification CASCADE;

CREATE TABLE IF NOT EXISTS notification (
  idnotification SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  vue INT NULL,
  message VARCHAR(255) NULL,
  FOREIGN KEY (userId) REFERENCES users (iduser));


-- -----------------------------------------------------
-- Table tag
-- -----------------------------------------------------
DROP TABLE IF EXISTS tag CASCADE;

CREATE TABLE IF NOT EXISTS tag (
  idtag SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  tag VARCHAR(255) NULL,
  FOREIGN KEY (userId) REFERENCES users (iduser));


-- -----------------------------------------------------
-- Table blocked
-- -----------------------------------------------------
DROP TABLE IF EXISTS blocked CASCADE;

CREATE TABLE IF NOT EXISTS blocked (
  idblocked SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  blockedUserId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (iduser),
  FOREIGN KEY (blockedUserId) REFERENCES users (iduser));

-- Add users de test :
INSERT INTO users
	(firstname, lastname, mail, username, password, confirmKey)
VALUES
	'Doe', 'John', 'john.doe@gmail.com', 'jdoe', '$2y$10$YImWH8WPvzktL4WahZbxAOjxbHRWHyquWibbMQggw2wP7rwXSvz/u', '17832556475152554');