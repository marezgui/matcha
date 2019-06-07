import moment from 'moment';
import Geocode from 'react-geocode';

// eslint-disable-next-line import/prefer-default-export

export const updateObject = (oldObject, newProperties) => ({
  ...oldObject,
  ...newProperties,
});

const checkRegexMatch = (name, value) => {
  let regex = /^[A-Z]*(?:-[A-Z]+)*$/i; // FirstName, LastName

  if (name === 'username') {
    regex = /^[A-Z][A-Z0-9]*(?:[-_][A-Z0-9]+)*$/i;
  } else if (name === 'mail') {
    regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  } else if (name === 'password') {
    regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
  } else if (name === 'bio') {
    regex = /^[a-zA-Z0-9_.,'"-\s]*$/;
  }
  return regex.test(value);
};

export const checkInputValidity = (name, value, min, max) => {
  let error = null;

  if (value === '') {
    error = 'Cannot be empty!';
  } else if (value.length < min) {
    error = `${min} characters min.`;
  } else if (!checkRegexMatch(name, value)) {
    error = 'No match';
  } else if (value.length > max) {
    error = `${max} characters max.`;
  }
  return error;
};

const getDateDiff = (date) => {
  const newDate = new Date(date);
  const diffms = Date.now() - newDate.getTime();

  return new Date(diffms);
};

export const getAge = (dateOfBirth) => {
  const age = getDateDiff(dateOfBirth);

  return Math.abs(age.getUTCFullYear() - 1970);
};

// const convertUTCDateToLocalDate = (date) => {
//   const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

//   const offset = date.getTimezoneOffset() / 60;
//   const hours = date.getHours();

//   newDate.setHours(hours - offset);

//   return newDate;
// };

export const getLastLog = (lastLog) => {
  const date = new Date(lastLog);
  // const localTime = convertUTCDateToLocalDate(date);

  return moment(date).from(Date.now());
};

// const getAddressInfo = async (lat, lng) => {
//   let item = null;

//   Geocode.setApiKey('AIzaSyDZVkh6w_8zsKgHrE5_2LesCRtx72QMI4M');
//   Geocode.enableDebug();
//   await Geocode.fromLatLng(lat, lng)
//     .then(
//       (response) => {
//         item = response.results;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   return item;
// };

// export const getCity = async (lat, lng) => {
//   const item = await getAddressInfo(lat, lng);
//   console.log(item);
//   const arrAddress = item;
//   let itemRoute = '';
//   let itemLocality = '';
//   let itemCountry = '';
//   let itemPc = '';
//   let itemSnumber = '';

//   item.forEach((address_components, id) => {
//     item[id].address_components.forEach((i, address_component) => {
//       console.log(`address_component:${i}`);

//       if (address_component.types[0] == 'route') {
//         console.log(`${i}: route:${address_component.long_name}`);
//         itemRoute = address_component.long_name;
//       }

//       if (address_component.types[0] == 'locality') {
//         console.log(`town:${address_component.long_name}`);
//         itemLocality = address_component.long_name;
//       }

//       if (address_component.types[0] == 'country') {
//         console.log(`country:${address_component.long_name}`);
//         itemCountry = address_component.long_name;
//       }

//       if (address_component.types[0] == 'postal_code_prefix') {
//         console.log(`pc:${address_component.long_name}`);
//         itemPc = address_component.long_name;
//       }

//       if (address_component.types[0] == 'street_number') {
//         console.log(`street_number:${address_component.long_name}`);
//         itemSnumber = address_component.long_name;
//       }
//       // return false; // break the loop
//     });
//   });
// };
