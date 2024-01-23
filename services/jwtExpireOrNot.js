const jwt = require('jsonwebtoken');

const isTokenExpired = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.secretKey); // Replace 'your-secret-key' with your actual secret key
        // If the verification is successful, the token is not expired
        return false;
      } catch (error) {
        // If the verification fails, check if it's an expiration error
        if (error instanceof jwt.TokenExpiredError) {
          // Token has expired
          return true;
        } else {
          // Other verification errors
          return false;
        }
      }
}
 
module.exports = {
    isTokenExpired
}