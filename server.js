import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';

 const db = knex({   
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Pablo',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res)=> { res.send('database.users') })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3000, ()=> {
    console.log('app is running on post 3000');
})