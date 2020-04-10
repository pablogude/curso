const jwt = require('express-jwt');

const authorize = jwt( {
  secret: process.env.JWT_TOKEN,
  userProperty: 'payload'
});

module.exports = {
  authorize
}
