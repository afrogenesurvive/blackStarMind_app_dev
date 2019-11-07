const jwt = require('jsonwebtoken');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sessionStore = require('../middleware/sessionStore');

const { pocketVariables } = require('../helpers/pocketVars');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {

    pocketVariables.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  pocketVariables.token = token;
  if (!token || token === '') {
    req.isAuth = false;
    pocketVariables.isAuth = false;

    return next();
  }

  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, '5CleanStream');
  //   console.log("is-auth 3 pocketVars..." + JSON.stringify(pocketVariables), "decodedToken..." + decodedToken);
  // } catch (err) {
  //   req.isAuth = false;
  //   pocketVariables.isAuth = false;
  //   console.log("is-auth 4 pocketVars..." + JSON.stringify(pocketVariables), "decodedToken..." + decodedToken);
  //   return next();
  // }
  // if (!decodedToken) {
  //   req.isAuth = false;
  //   pocketVariables.isAuth = false;
  //   console.log("is-auth 5 pocketVars..." + JSON.stringify(pocketVariables));
  //   return next();
  // }
  // req.isAuth = true;
  // pocketVariables.isAuth = true;
  // pocketVariables.userId = decodedToken.userId;
  // req.userId = decodedToken.userId;
  // console.log("is-auth 6 pocketVars..." + JSON.stringify(pocketVariables));

  // if (req.session.userId === req.userId) {
  //   console.log("login token/request token match");
  //   req.isAuth = true;
  // } else if (req.session.userId !== req.userId) {
  //   console.log("login token/request token DO NOT match!!");
  //   req.isAuth = false;
  // }
  next();

};
