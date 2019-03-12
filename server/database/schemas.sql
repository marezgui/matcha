CREATE TABLE users (
	id serial PRIMARY KEY,
	firstName varchar (255) NOT NULL,
	lastName varchar (255) NOT NULL,
	mail varchar(255) NOT NULL,
	login varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	notifications smallint NOT NULL DEFAULT 1,
	registrationDate TIMESTAMP NOT NULL DEFAULT NOW(),
	activate smallint DEFAULT NULL,
	confirmKey varchar(255) NOT NULL,
	restoreKey varchar(255) DEFAULT NULL
);
/*
INSERT INTO users 
	(firstName, lastName, mail, login, password, confirmKey) 
VALUES
	('Doe', 'John', 'john.doe@gmail.com', 'jdoe', '$2y$10$YImWH8WPvzktL4WahZbxAOjxbHRWHyquWibbMQggw2wP7rwXSvz/u', '178345647515454');
*/