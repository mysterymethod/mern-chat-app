// helps us to authorize the user in the backend.
// user can only access resource that is only available to him.
// user will send jwt to the backend, backend will verify this is the user
// that is authorize to access this perticular resource.


const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });
};

module.exports = generateToken;