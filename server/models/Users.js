const db = require('../database');

class Users {
	static getUser(login, callback) {
		db.query('SELECT * from users WHERE login=($1)', [login], (err, res) => {
			if (err.error)
					return callback(err);
			callback(res);
		});
	}

	static getUsersMen(callback) {
		db.query('SELECT * FROM users Where sexe = "homme" ', (err, res) => {
			if (err.error)
					return callback(err);
			callback(res);
		});
	}


	static getUsersWomen(callback) {
		db.query('SELECT * FROM users Where sexe = "femme" ', (err, res) => {
			if (err.error)
					return callback(err);
			callback(res);
		});
	}

	static addUser(data, callback) {
			// ici yassin
	}
}

module.exports = Users;