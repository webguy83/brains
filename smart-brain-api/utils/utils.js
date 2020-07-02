const { redisClient } = require('../middlewares/Auth');
const jwt = require('jsonwebtoken');

const signToken = (email) => {
  const jwtPayload = { email }
  return jwt.sign(jwtPayload, 'Nonsense garbage', { expiresIn: '5 days' })
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value))
}

module.exports = {
  signToken,
  setToken
}
