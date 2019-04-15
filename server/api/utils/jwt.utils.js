/*

		888                                               888                888
		888                                               888                888
		888                                               888                888
	.d88888 .d88b. 88888b. 888d888 .d88b.  .d8888b 8888b. 888888 .d88b.  .d88888
	d88" 888d8P  Y8b888 "88b888P"  d8P  Y8bd88P"       "88b888   d8P  Y8bd88" 888
	888  88888888888888  888888    88888888888     .d888888888   88888888888  888
	Y88b 888Y8b.    888 d88P888    Y8b.    Y88b.   888  888Y88b. Y8b.    Y88b 888
	"Y88888 "Y8888 88888P" 888     "Y8888  "Y8888P"Y888888 "Y888 "Y8888  "Y88888
					888
					888
					888

		a ce stade du dev nous n'utilison plus cette methode
		mais on laisse ca jusqu'a la fin au cas ou on doit generer un token
*/

import jwt from 'jsonwebtoken'

//	import secret key

import dotenv from 'dotenv'
dotenv.load()
const	SECRETKEY = process.env.SECRETKEY;

//	fonction aui genere les tokens

export const generatetoken_USER = (userdata) => {
	return jwt.sign({
		userid : userdata.id,
	},
	SECRETKEY,
	{
		expiresIn : '1h'
	})
}

//	Fonctions qui check les tokens

const parseAuthorization = (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

export const getuserid = (authorization) => {
    var userid = -1;
    var token = parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, SECRETKEY);
        if(jwtToken != null)
          userid = jwtToken.userid;
      } catch(err) { }
    }
    return userid;
}
