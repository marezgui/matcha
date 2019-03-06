const   path = require('path'),
        express = require('express'),
        bodyParser = require('body-parser');
        
const   ENV = process.env.NODE_ENV,
        PORT = process.env.PORT || 8080;

const   app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;