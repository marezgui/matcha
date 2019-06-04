import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export

export const updateObject = (oldObject, newProperties) => ({
  ...oldObject,
  ...newProperties,
});

const checkRegexMatch = (name, value) => {
  let regex = /^[A-Z]*(?:-[A-Z]+)*$/i; // FirstName, LastName

  if (name === 'login') {
    regex = /^[A-Z][A-Z0-9]*(?:[-_][A-Z0-9]+)*$/i;
  } else if (name === 'mail') {
    regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  } else if (name === 'password') {
    regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
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
