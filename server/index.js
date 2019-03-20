// ##################################################
// Point d'entre de API
// ##################################################

const	ENV = process.env.NODE_ENV,
			PORT = process.env.PORT || 8080;

const	path = require('path'),
		express = require('express'),
		bodyParser = require('body-parser'), 
		db = require('./database'),
		app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./api/users'));

/* Production */

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
	if (err.error)
    	return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;

/*
if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}
*/