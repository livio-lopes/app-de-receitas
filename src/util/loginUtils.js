const validationAccess = (userLogin) => {
  const { email, password } = userLogin;
  const validEmail = (/\S+@\S+\.\S+/i).test(email);
  const minPasswordLength = 6;
  const validPassword = password.length >= minPasswordLength;
  return !(validEmail && validPassword);
};

export default validationAccess;
