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

export const getAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const diffms = Date.now() - dob.getTime();
  const age = new Date(diffms);

  return Math.abs(age.getUTCFullYear() - 1970);
};
