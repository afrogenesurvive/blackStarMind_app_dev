const jwt = require('jsonwebtoken');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sessionStore = require('../middleware/sessionStore');

const { pocketVariables } = require('../helpers/pocketVars');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, '5CleanStream');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;

  // if (req.session.userId === req.userId) {
  //   console.log("login token/request token match");
  //   req.isAuth = true;
  // } else if (req.session.userId !== req.userId) {
  //   console.log("login token/request token DO NOT match!!");
  //   req.isAuth = false;
  // }
  next();

};
