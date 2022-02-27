const jsonwebtoken = require('jsonwebtoken');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  // pull the _id from the user
  const { _id } = user;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  // RS256 for aysmmetric key, HS256 for a symmetric key
  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
