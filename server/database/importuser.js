import request from 'request';
import util from 'util';

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

  const result = await getuserresult(numberuser)
    .then(data => JSON.parse(data.body))
    .catch((err) => { console.log(err); });

  console.log(result);

};

export default importuser;
