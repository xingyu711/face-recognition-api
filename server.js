const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'xingyulai',
    password : '',
    database : 'face-recognition'
  }
});

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.json('the server is working')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db)) 
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)}) 

app.listen(3000, () => {
  console.log("app is running on port 3000.")
})


/*

root route (/): show "this is working"
signin route (/signin): POST request => success or fail
register route (/register): POST request => user object
profile route (/profile/:userID): GET request => user object
image route (/image): PUT request => updated user object

*/