/* eslint-disable no-useless-escape */

const emailValidator = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};

export default emailValidator;
