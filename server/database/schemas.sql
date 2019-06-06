--
-- ─── FORMAT DE LA BASE DE DONNEE ────────────────────────────────────────────────
--

DROP SCHEMA IF EXISTS matcha ;
CREATE SCHEMA IF NOT EXISTS matcha ;

--
-- ─── ENUM ───────────────────────────────────────────────────────────────────────
--
CREATE TYPE GENRE AS ENUM ('M', 'W', 'O');
CREATE TYPE TYPENOTIF AS ENUM ('VUE', 'LIKE', 'UNLIKE', 'MATCHE', 'NEWMESSAGE', 'OTHER');
CREATE TYPE ORIENTATION AS ENUM ('M', 'W', 'BI');

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "blocked" CASCADE;
DROP TABLE IF EXISTS "matche" CASCADE;
DROP TABLE IF EXISTS "likes" CASCADE;
DROP TABLE IF EXISTS "notification" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;
DROP TABLE IF EXISTS "report" CASCADE;

SET timezone='europe/paris';

/*
    Formatage des json :
    let image = {
      master: 'image2',
      image1: piclarge,
      image2: picmedium,
      image3: picthumbnail,
      image4: '',
      image5: '',
    };
    image = JSON.stringify(image); // on a donc notre json base64 pour les images

    let location = {
      street: tmp.location.street,
      city: tmp.location.city,
      state: tmp.location.state,
      postcode: tmp.location.postcode,
      latitude: tmp.location.coordinates.latitude,
      longitude: tmp.location.coordinates.longitude,
    };
    location = JSON.stringify(location); // on a donc notre location
*/

CREATE TABLE IF NOT EXISTS "users" (
  "idUser" SERIAL PRIMARY KEY,
  "mail" VARCHAR(255) NULL,
  "password" VARCHAR(255) NULL,
  "username" VARCHAR(255) NULL,
  "firstName" VARCHAR(255) NULL,
  "lastName" VARCHAR(255) NULL,
  "bio" VARCHAR(700) NULL,
  "genre" GENRE DEFAULT 'O',
  "orientation" ORIENTATION DEFAULT 'BI',
  "dateOfBirth" DATE NULL,
  "registrationDate" TIMESTAMP DEFAULT NOW(),
  "activate" boolean DEFAULT '0',
  "userIsComplete" boolean DEFAULT '0',
  "notifications" boolean DEFAULT '1',
  "confirmKey" VARCHAR(255) NULL,
  "restoreKey" VARCHAR(255) NULL,
  "score" INT DEFAULT '0',
  "report" INT DEFAULT '0',
  "isOnline" boolean DEFAULT '0',
  "connexionLog" TIMESTAMP DEFAULT NOW(),
  "location" JSON NULL,
  "photo" JSON NULL);

CREATE TABLE IF NOT EXISTS "matche" (
  "idMatche"  SERIAL PRIMARY KEY,
  "userId1" INT NOT NULL,
  "userId2" INT NOT NULL,
  "matcheDate" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId1") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userId2") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "message" (
  "idMessage"  SERIAL PRIMARY KEY,
  "matcheId" INT NOT NULL,
  "sendUserId" INT NOT NULL,
  "date" TIMESTAMP DEFAULT NOW(),
  "message" VARCHAR(255) NULL,
  FOREIGN KEY ("matcheId") REFERENCES "matche" ("idMatche") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("sendUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "likes" (
  "idLike"  SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "likedUserId" INT NOT NULL,
  "likeDate" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("likedUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS "notification" (
  "idNotification" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "userIdSender" INT DEFAULT NULL,
  "vue" boolean DEFAULT '0',
  "type" TYPENOTIF DEFAULT 'OTHER',
  "message" VARCHAR(255) NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userIdSender") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);

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

CREATE TABLE IF NOT EXISTS "report" (
  "idReported" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "reportedUserId" INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("reportedUserId") REFERENCES "users" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE);
