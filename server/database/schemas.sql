/* Create database named 'matcha' AND execute the following code */
/* We use camelCase */
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
-- Table "users"
-- -----------------------------------------------------

CREATE TYPE GENRE AS ENUM ('M', 'W', 'O');
CREATE TYPE ORIENTATION AS ENUM ('M', 'W', 'BI');

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "blocked" CASCADE;
DROP TABLE IF EXISTS "chat" CASCADE;
DROP TABLE IF EXISTS "vues" CASCADE;
DROP TABLE IF EXISTS "matche" CASCADE;
DROP TABLE IF EXISTS "likes" CASCADE;
DROP TABLE IF EXISTS "notification" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;

SET timezone='europe/paris';

CREATE TABLE IF NOT EXISTS "users" (
  "idUser" SERIAL PRIMARY KEY,
  "mail" VARCHAR(255) NULL,
  "password" VARCHAR(255) NULL,
  "username" VARCHAR(255) NULL,
  "firstName" VARCHAR(255) NULL,
  "lastName" VARCHAR(255) NULL,
  "bio" VARCHAR(255) NULL,
  "genre" GENRE DEFAULT 'O',
  "orientation" ORIENTATION DEFAULT 'BI',
  "dateOfBirth" DATE NULL,
  "registrationDate" TIMESTAMP DEFAULT NOW(),
  "activate" boolean DEFAULT '0',
  "notifications" boolean DEFAULT '1',
  "confirmKey" VARCHAR(255) NULL,
  "restoreKey" VARCHAR(255) NULL,
  "score" INT DEFAULT '0',
  "report" INT DEFAULT '0',
  "connexionLog" TIMESTAMP DEFAULT NOW(),
  "location" JSON NULL,
  "photo" JSON NULL);

CREATE TABLE IF NOT EXISTS "chat" (
  "idChat" SERIAL PRIMARY KEY,
  "userId1" INT NOT NULL,
  "userId2" INT NOT NULL,
  FOREIGN KEY ("userId1") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userId2") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "matche" (
  "idMatche"  SERIAL PRIMARY KEY,
  "userId1" INT NOT NULL,
  "userId2" INT NOT NULL,
  "matcheDate" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId1") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userId2") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "likes" (
  "idLike"  SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "likedUserId" INT NOT NULL,
  "likeDate" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("likedUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "vues" (
  "idVues" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "vueUserId" INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("vueUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "notification" (
  "idNotification" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "vue" INT NULL,
  message VARCHAR(255) NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "tag" (
  "idTag" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "tag" VARCHAR(255) NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "blocked" (
  "idBlocked" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "blockedUserId" INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("blockedUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);
