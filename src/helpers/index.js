import validator from 'validator';

const validate = (data) => {
  const {
    firstName, lastName, email, password,
  } = data;

  const errors = {
    errorFirstName: '',
    errorLastName: '',
    errorEmail: '',
    errorPassword: '',
  };

  let hasErrors = false;

  if (firstName) {
    if (!validator.isAlpha(firstName.trim())) {
      errors.errorFirstName = 'First Name must contain alphabeths only';
      hasErrors = true;
    }
  } else {
    errors.errorFirstName = 'First Name is required';
    hasErrors = true;
  }

  if (lastName) {
    if (!validator.isAlpha(lastName.trim())) {
      errors.errorLastName = 'Last Name must contain alphabeths only';
      hasErrors = true;
    }
  } else {
    errors.errorLastName = 'Last Name is required';
    hasErrors = true;
  }

  if (email) {
    if (!validator.isEmail(email.trim())) {
      errors.errorEmail = 'Invalid Email Address';
      hasErrors = true;
    }
  } else {
    errors.errorEmail = 'Email is required';
    hasErrors = true;
  }

  if (!password) {
    errors.errorPassword = 'Password is required';
    hasErrors = true;
  }

  return Object.keys(errors).length > 0
    ? { errors, hasErrors }
    : { errors, hasErrors };
};

export default validate;
