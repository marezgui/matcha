import request from 'request';
import util from 'util';
import axios from 'axios';
import { db } from './index';

// Get User Sample
const getuser = (numberuser, callback) => {
  request.get({
    rejectUnauthorized: false,
    url: `https://randomuser.me/api/?results=${numberuser}`,
  }, (err, res) => {
    if (err) { callback(err, null); }
    callback(null, res);
  });
};
const getuserresult = util.promisify(getuser);


const importuser = async (numberuser) => {

  let result = await getuserresult(numberuser).then(data => JSON.parse(data.body))
    .catch((err) => { console.log(err); });

  result = result.results;

  for (let i = 0; i < numberuser; i += 1) {
    const tmp = result[i];

    let image;

    image = await axios.get(tmp.picture.large, { responseType: 'arraybuffer' });
    const piclarge = Buffer.from(image.data).toString('base64');

    image = await axios.get(tmp.picture.medium, { responseType: 'arraybuffer' });
    const picmedium = Buffer.from(image.data).toString('base64');

    image = await axios.get(tmp.picture.thumbnail, { responseType: 'arraybuffer' });
    const picthumbnail = Buffer.from(image.data).toString('base64');

    image = {
      master: 'image2',
      image1: piclarge,
      image2: picmedium,
      image3: picthumbnail,
      image4: '',
      image5: '',
    };
    image = JSON.stringify(image); // on a donc notre json base64 pour les images

    let place = {
      street: tmp.location.street,
      city: tmp.location.city,
      state: tmp.location.state,
      postcode: tmp.location.postcode,
      latitude: tmp.location.coordinates.latitude,
      longitude: tmp.location.coordinates.longitude,
    };
    place = JSON.stringify(place);

    // On charge toutes les variables user
    const password = '$2b$05$Or9XszDZvrVnSXpEBnT7fu97K.7RJd99BSJw.LwnUuLnXTQt4.qje'; // Password : Password1234 pour tout le monde comme ca facile a retenir
    const firstName = tmp.name.first;
    const lastName = tmp.name.last;
    const mail = tmp.email;
    const { username } = tmp.login;
    const bio = tmp.location.description;
    const activate = true;
    const photo = image;
    const dateOfBirth = tmp.dob.date;
    const location = place;
    const score = (Math.trunc(Math.random() * (1000 - 0)));
    const report = (Math.trunc(Math.random() * (150 - 0)));

    db.query('INSERT INTO "users" ("password", "firstName", "lastName", "mail", "username", "bio", "activate", "photo", "dateOfBirth", "location", "score", "report") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [password, firstName, lastName, mail, username, bio,
        activate, photo, dateOfBirth, location, score, report], (err) => {
        if (err.error) {
          console.log(err.error);

        }
        console.log(`user :${mail}`);
      });

  }
};

export default importuser;
