const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      '5CleanStream',
      {
        expiresIn: '5h'
      }
    );
    
    pocketVariables.user._id = user.id;
    pocketVariables.user.email = user.email;
    // console.log(JSON.stringify(pocketVariables));

    return { userId: user.id, token: token, tokenExpiration: 5 };
  }
};
