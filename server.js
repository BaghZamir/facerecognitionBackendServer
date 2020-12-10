import express from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/Register.js';
import handleSignin from './controllers/Signin.js';
import {handleImage, handleApiCall} from './controllers/Image.js';
import handleProfile from './controllers/Profile.js';



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pa55word',
    database : 'smartbrain'
  }
});

db.select('*').from('users');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));
app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageapi', (req, res) => handleApiCall(req, res));

app.listen(3001, () =>{
	console.log('app running on port 3001');
})