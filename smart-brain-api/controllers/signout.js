const { redisClient } = require('../middlewares/Auth');

const authSignout = () => (req, res) => {
  console.log(redisClient.set('toke', 324324))
  redisClient.del('token', (err, reply) => {

    if (reply === 1) {
      console.log('buhh bye!')
    } else {
      console.log('no can do')
    }
  })
  res.json({ success: true })
}

module.exports = {
  authSignout
}