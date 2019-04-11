import jwt from 'jsonwebtoken'

// cle pour generer les tokens
const keytoken_USERS = "7rB75N4NrvfPSA7ran6Sx8R5w7SxFd6R3M83NW6gMc3zDKcPHNkT4678cMKL99mZWun26v6a68U54M48urX9m84cyiVFkddVuE6s"

// fonction aui genere les tokens
export const generatetoken_USER = (userdata) => {
	return jwt.sign({
		userid : userdata.id,
	},
	keytoken_USERS,
	{
		expiresIn : '1h'
	})
}

// Fonctions qui check les tokens

const parseAuthorization = (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

export const getuserid = (authorization) => {
    var userid = -1;
    var token = parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, keytoken_USERS);
        if(jwtToken != null)
          userid = jwtToken.userid;
      } catch(err) { }
    }
    return userid;
}
