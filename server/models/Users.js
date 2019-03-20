const db = require('../database');

class Users {
<<<<<<< HEAD
    static getUser(login, callback) {
        db.query('SELECT * from users WHERE login=($1)', [login], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static getUsersMen(callback){
        db.query('SELECT * FROM users Where sexe = "homme" ', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static getUsersWomen(callback){
        db.query('SELECT * FROM users Where sexe = "femme" ', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static addUser(data, callback) {
        
    }


    /*
    static insert (firstName, callback) {
        db.query('INSERT INTO users (firstName) VALUES ($1)', [firstName], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
    */
=======
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
>>>>>>> refs/remotes/origin/master
}

module.exports = Users;