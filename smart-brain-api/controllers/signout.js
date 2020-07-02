const { redisClient } = require('../middlewares/Auth');

const authSignout = () => (req, res) => {
  const { authorization } = req.headers;
  redisClient.del(authorization, (err, reply) => {
    if (reply === 1) {
      console.log('buhh bye!')
      res.json({ success: true })
    } else {
      console.log('no can do')
    }
  })
}

module.exports = {
  authSignout
}