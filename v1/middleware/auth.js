import jwt from 'jsonwebtoken';

let decodedToken;
const checkTokens = (req, res, next) => {
  try {
    decodedToken = jwt.verify(req.body.data.token, 'secretKeys');
    next();
  } catch (error) {
    res.status(401).send({ // 401 is unauthorised access 409 is conflicting request
      status: 'error',
      message: `Auth failed: ${error}`,
    });
  }
};

// middleware function to used if the request was made with form-date instead of json body
const checkTokensFormData = (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, 'secretKeys');
    next();
  } catch (error) {
    res.status(401).send({ // 401 is unauthorised access 409 is conflicting request
      status: 'error',
      message: `Auth failed: ${error}`,
    });
  }
};

export { checkTokens, checkTokensFormData, decodedToken };
