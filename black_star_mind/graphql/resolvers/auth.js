const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sessionStore = require('../../middleware/sessionStore');

const User = require('../../models/user');

const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  login: async ({ email, password }, req) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id },'5CleanStream',{expiresIn: '5h'});

    // const loginUserInfo = await User.findById(user.id)

    // req.session.userId = user.id;
    // req.session.token = token;
    // req.session.username = loginUserInfo.username;
    // req.session.test = "testing...";
    // pocketVariables.user._id = user.id;
    // pocketVariables.user.token = token;
    // console.log("logged in... userId pocket vars set");
    // console.log("session ID... " + req.session.id);
    // console.log("logged in!! Session info ... " + JSON.stringify(req.session));

    return { userId: user.id, token: token, tokenExpiration: 5 };
  }
};
