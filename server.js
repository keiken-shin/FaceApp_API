const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

// Modules
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const enteries = require('./controllers/enteries');

// Environmental Variables
const PORT = process.env.PORT || 8000;

// DATABASE Connection
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '3127',
        database: 'faceapp'
    }
})

const app = express();

// Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(cors());

// Root Route
app.get('/', (req, res) => {
    res.send('It is working');
})

// Sigin
app.post('/signin', (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt);
})

// Register
app.post('/register', (req,res) => {
    register.handleRegister(req, res, db, bcrypt);
})

// User Profile
app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db);
})

// Enteries Update
app.put('/image', (req, res) => {
    enteries.handleEnteries(req, res, db);
})

// Image Detect
app.post('/imageurl', (req, res) => {
    enteries.handleApiCall(req, res);
})

app.listen(PORT, () => {
    console.log(`App on port ${PORT}`);
})