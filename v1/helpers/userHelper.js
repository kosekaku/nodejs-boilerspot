
// Output to be printed to the user as json object after successful signup or signin
const userOutput = (
  token, id, firstName, lastName, email, phoneNumber, address, isAgent, gender, hashedPassword,
) => {
  const result = {
    status: 'success',
    data: {
      token,
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      isAgent,
      gender,
      hashedPassword,
    },
  };
  return result;
};

// when something goes wrong in a try block of asyn function, we simply return a 500 error
const serverError = (error, res) => res.status(500).json({
  status: 'error',
  error: `something went wrong  ${error}`,
});

export { userOutput, serverError };
