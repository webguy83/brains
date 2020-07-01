const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const { requireAuth } = require('./middlewares/Auth');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(db.users) })
//app.get('/', (req, res) => { res.send('<h1>get fucked</h1?') })
app.post('/signin', signin.signInAuth(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/profile/:id', requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })
app.put('/image', requireAuth, (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', requireAuth, (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
  console.log('app is running on port 3001 hazzaaah');
})
