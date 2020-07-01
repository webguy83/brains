const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(_err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pets } = req.body.formInput;

  db('users').where({ id }).update({ name })
    .then(data => {
      if (data) {
        res.json('success');
      } else {
        res.status(400).json('cannot update')
      }
    })
    .catch(_err => res.status(400).json('error updating the user!'))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}