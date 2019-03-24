/* Create database named 'matcha' AND execute the following code */

CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
	firstName varchar (255) NOT NULL,
	lastName varchar (255) NOT NULL,
	mail varchar(255) NOT NULL,
	login varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	notifications boolean DEFAULT '1',
	registrationDate TIMESTAMP DEFAULT NOW(),
	activate boolean DEFAULT '0',
	confirmKey varchar(255) NOT NULL,
	restoreKey varchar(255) DEFAULT NULL
);

CREATE TYPE GENRE AS ENUM ('Homme', 'Femme');
CREATE TYPE ORIENTATION AS ENUM ('Homme', 'Femme', 'Bisexuel');

CREATE TABLE IF NOT EXISTS profile (
	id serial PRIMARY KEY,
	users_id serial,
	genre GENRE,
	orientation ORIENTATION,
	images JSON,
	bio TEXT,
	interests varchar(255),
	score integer DEFAULT 0,
	location varchar(255) NOT NULL,
	dateOfBirth DATE,
	FOREIGN KEY (users_id) REFERENCES users (id)
);

DELETE FROM profile WHERE 1=1;
DELETE FROM users WHERE 1=1;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE profile_id_seq RESTART WITH 1;

INSERT INTO users 
	(firstName, lastName, mail, login, password, confirmKey) 
VALUES
	('Doe', 'John', 'john.doe@gmail.com', 'jdoe', '$2y$10$YImWH8WPvzktL4WahZbxAOjxbHRWHyquWibbMQggw2wP7rwXSvz/u', '178345647515454');

INSERT INTO profile 
	(users_id, genre, orientation, bio, interests, location, dateofbirth) 
VALUES 
	(1, 'Homme', 'Femme', 'Hello Everyone', '42,sport,cinema', 'paris', '10/10/1990');